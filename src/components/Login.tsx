import { navigate } from "@reach/router";
import { ME_QUERY } from "graphql/queries";
import { useLogInMutation } from "graphql/types";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import Loader from "./Loader";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, { error, loading }] = useLogInMutation({
    update: (cache, res) => {
      const token = res.data?.logIn;
      if (token) {
        token && localStorage.setItem("token", token);
        cache.writeQuery<any, any>({ query: ME_QUERY, data: (meData: any) => { console.log(meData) } });
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
    <StyledForm onSubmit={(e) => {
      e.preventDefault()
      logIn({ variables: { password, email } });
      setPassword("");
      setEmail("");
    }}>
      {error && <span>{error.message}</span>}
      {loading && <Loader></Loader>}
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
      <StyledButton>logIn</StyledButton>
    </StyledForm>
  );
};


const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  max-width: 30rem;
  min-height: 12rem;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary2};
  label{
    display: flex;
   flex-flow: column nowrap;
   color: hsl(330, 88%, 903%);
  }
  input{
    background: ${({ theme }) => theme.colors.accent1};
    padding: 0 0.6rem; 
    width: 100%;
    border-radius: 3px;
    align-self: center;
    min-height: 1.4rem;
  }
  button{
    margin-top: 2rem;
    background: hsl(30, 78%, 75%);
  }
`

const StyledButton = styled.button`
cursor: pointer;
background: white;
padding: 0.3rem;
`