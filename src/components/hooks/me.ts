import {
  useMeQuery,
  LogInMutationVariables,
  useLogInMutation,
} from "graphql/types";
import apolloClient from "apolloClient";
import { ME_QUERY } from "graphql/queries";
import { navigate } from "@reach/router";

export const useMe = () => {


  const { data, loading, error } = useMeQuery();

  const me = data?.me;
  const id = me?.id ?? null;


  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      //calling both clearStore and resetStore to make sure the store is cleared and the queries are not refetched
      await apolloClient.clearStore();
      await apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }
    navigate("/auth");
  };
  return { me, id, loading, error, logOut };
};
