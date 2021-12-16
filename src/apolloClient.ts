//sets up the apollo client
//not using apollo-boost because it does not support subscriptions
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache({
  typePolicies: {

    User: {
      fields: {
        profileImageUrl: {
          read(existing) {
            return existing || "user_placeholder.png"
          }
        }
      }
    }
  }
});


const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    // Handle Errors
    graphQLErrors.forEach(console.log)
  }

  forward(operation)
})


// export const apolloClient = new ApolloClient({
//   cache,
//   link: from([errorLink, httpLink])
// })

const httpLink = createUploadLink({
  //uri: "http://127.0.0.1:4000/graphql",
  uri: "https://bookshare-backend1234.herokuapp.com/graphql",
  credentials: "include",
});

// const wsLink = new WebSocketLink({
//   uri: "wss://bookshare-backend1234.herokuapp.com/graphql",
//   options: {
//     reconnect: true,
//     connectionParams: { authToken: localStorage.getItem("token") || null },
//   },
// });

const authLink = setContext((_, { headers }) => {
  //gets the jwt from storage
  const token = localStorage.getItem("token") || null;
  return {
    //sets it in the Authorization header
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const terminatingLink = split(
//   ({ query }: any) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   // wsLink,
//   httpLink
// );

export default new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache,
  assumeImmutableResults: true,
  // resolvers,
  //setting the default to return any data received along with an error instead of treating it as a network error
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
