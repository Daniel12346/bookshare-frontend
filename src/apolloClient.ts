//sets up the apollo client
//TODO: subscriptions

//not using apollo-boost because it does not support subscriptions
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";
import { navigate } from "@reach/router";
import { createUploadLink } from "apollo-upload-client";
import typeDefs from "graphql/localSchema";
import resolvers from "graphql/localResolvers";

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors &&
    graphQLErrors.forEach(err => {
      if (err.extensions && err.extensions.code === "UNAUTHENTICATED") {
        navigate("/login");
      }
      //TODO: do auth checks on more queries on the backend
      /*
      if (err.extensions) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
        }
      }*/
    });
  //TODO: error screen
  networkError && console.error(networkError.message);
});

const httpLink = createUploadLink({
  uri: "http://127.0.0.1:4000/graphql",
  //uri: "https://chat-server1234.herokuapp.com/graphql",
  credentials: "include"
});

const wsLink = new WebSocketLink({
  uri: "ws://127.0.0.1:4000/graphql",
  options: { reconnect: true }
});

const authLink = setContext((_, { headers }) => {
  //gets the jwt from storage
  const token = localStorage.getItem("token") || null;
  return {
    //sets it in the Authorization header
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const terminatingLink = split(
  ({ query }: any) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link: authLink.concat(errorLink).concat(terminatingLink),
  cache,
  assumeImmutableResults: true,
  typeDefs,
  resolvers,
  //setting the default to return any data received along with an error instead of treating it as a network error
  defaultOptions: {
    query: {
      errorPolicy: "all"
    },
    mutate: {
      errorPolicy: "all"
    }
  }
});
