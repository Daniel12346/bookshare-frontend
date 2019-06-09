//sets up the apollo client
//TODO: subscriptions

//not using apollo-boost because it does not support subscriptions
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
//import { withClientState } from "apollo-link-state";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4000/graphql",
  //uri: "https://chat-server1234.herokuapp.com/graphql",
  credentials: "include"
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
/*
//TODO:
const stateLink=withClientState({
  cache,resolvers:{
    Query:{
      isAuth:()=>{
        return !!localStorage.getItem("token")
      }
    }
  }
})
*/
export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});
