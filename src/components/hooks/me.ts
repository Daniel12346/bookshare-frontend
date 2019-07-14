import {
  useMeQuery,
  LogInMutationVariables,
  useLogInMutation
} from "graphql/types";
import apolloClient from "apolloClient";
import { ME_QUERY } from "graphql/queries";

export const useMe = () => {
  const logInMutation = useLogInMutation();

  const { data, loading, error } = useMeQuery();

  const me = data && data.me;
  //returns true if me is not null or undefined
  const isLoggedIn = !!me;

  const logIn = async (variables: LogInMutationVariables): Promise<void> => {
    logInMutation({
      variables,
      //the update function sets the received jwt inside the storage
      update: (_, { data }) => {
        const token = data && data.logIn;
        token && localStorage.setItem("token", token);
      },
      //after the mutation, ME_QUERY is refetched with the token in the Authorization header (setting the header was set up in apolloClient.ts)
      refetchQueries: [{ query: ME_QUERY }]
    });
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    //calling both clearStore and resetStore to make sure the store is cleared and the queries are not refetched
    await apolloClient.clearStore();
    await apolloClient.resetStore();
  };
  return { me, loading, error, isLoggedIn, logIn, logOut };
};
