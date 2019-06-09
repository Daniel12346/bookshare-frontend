import React, { useState, FormEvent } from "react";
import { ME_QUERY } from "graphql/queries";
import client from "apolloClient";
import { useLogInMutation } from "graphql/types";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = useLogInMutation();

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await logIn({ variables: { email, password } });
      const token = res.data && res.data.logIn;
      token && localStorage.setItem("token", token);
      //the client needs to be directly queried because the login query only returns the token with the user id, and not all user data
      //the token is saved inside the local storage right away because apollo client was configured to get the token from the local storage and set it inside the authorization header on every request
      setPassword("");
      setEmail("");

      const { data } = await client.query({ query: ME_QUERY });
      await client.writeQuery({ query: ME_QUERY, data });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleLogIn}>
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
