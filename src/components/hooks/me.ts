import {
  useMeQuery,
  LogInMutationVariables,
  useLogInMutation
} from "graphql/types";
import apolloClient from "apolloClient";
import { ME_QUERY } from "graphql/queries";
/*
interface MeProviderProps {
  children: ReactNode;
}

const MeContext = createContext<User | undefined | null>(undefined);

export const MeProvider = ({ children }: MeProviderProps) => {
  const { data } = useMeQuery();
  //TODO: fix typing
  return (
    <MeContext.Provider value={(data && (data.me as User)) || null}>
      {children}
    </MeContext.Provider>
  );
};*/

export const useMe = () => {
  const logInMutation = useLogInMutation({ errorPolicy: "all" });

  const { data, loading, error } = useMeQuery({ errorPolicy: "all" });

  const me = data && data.me;
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
    await apolloClient.clearStore();
    await apolloClient.resetStore();
  };
  return { me, loading, error, isLoggedIn, logIn, logOut };
};
/*
const handleLogIn = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const res = await logIn({ variables: { email, password } });
    const token = res.data && res.data.logIn;
    token && localStorage.setItem("token", token);
    //the apolloClient needs to be directly queried because the login query only returns the token with the user id, and not all user data
    //the token is saved inside the local storage right away because apollo apolloClient was configured to get the token from the local storage and set it inside the authorization header on every request
    setPassword("");
    setEmail("");

    const { data } = await apolloClient.query({ query: ME_QUERY });
    await apolloClient.writeQuery({ query: ME_QUERY, data });
  } catch (e) {
    console.log(e);
  }
};*/
