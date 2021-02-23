import { navigate } from "@reach/router";
import { ME_QUERY } from "graphql/queries";
import { useLogInMutation } from "graphql/types";
import React, { useState, FormEvent } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, { error }] = useLogInMutation({
    update: (cache, res) => {
      const token = res.data?.logIn;
      if (token) {
        token && localStorage.setItem("token", token);
        //TODO: skužit zošto ovo rodi   (je ovo rodi???)
        cache.writeQuery<any, any>({ query: ME_QUERY, data: (meData: any) => { console.log("ME!!!!: ", meData) } });
      }
    }, onCompleted: () => { navigate("/") }
  });

  // const logIn = async (variables: LogInMutationVariables): Promise<void> => {
  //   try {
  //     logInMutation({
  //       variables,
  //       //the update function sets the received jwt inside the storage
  //       update: (_, { data }) => {
  //         const token = data?.logIn;
  //         token && localStorage.setItem("token", token);
  //       },
  //       //after the mutation, ME_QUERY is refetched with the token in the Authorization header (setting the header was set up in apolloClient.ts)
  //       refetchQueries: [{ query: ME_QUERY }],
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };


  // const handleLogIn = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await logIn({ variables: { password, email } });
  //     if (res.errors) {
  //       throw ("E");
  //     }
  //     setPassword("");
  //     setEmail("");
  //     navigate("/");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      logIn({ variables: { password, email } });
      setPassword("");
      setEmail("");
    }}>
      <span>{error?.message}</span>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail((e.target as HTMLInputElement).value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword((e.target as HTMLInputElement).value)}
        />
      </label>
      <button>logIn</button>
    </form>
  );
};
