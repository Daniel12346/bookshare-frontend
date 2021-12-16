import { navigate } from "@reach/router";
import { ME_QUERY } from "graphql/queries";
import { useLogInMutation, useSignUpMutation } from "graphql/types";
import React, { useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";

export default ({ mode, setMode }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


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


  //TODO: fix !
  const [signUp, { error: error_s, loading: loading_s }] = useSignUpMutation({ errorPolicy: "ignore" });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signUp({
        variables: {
          firstName: "Daniel4",
          lastName: "Vrandečić",
          email: "danezoki4@gmail.com",
          password: "Danezoki4"
        }
      });
      console.log(data);
    } catch (e) {
      console.log("Sign up failed");
      console.log("ERROR", e);
    }
  }


  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logIn({ variables: { password, email } });
    setPassword("");
    setEmail("");
  }

  return (
    <StyledForm onSubmit={e => { mode === "logIn" ? handleLogIn(e) : handleSignUp(e) }} ><StyledButtonContainer>
      <StyledButton isCurrentMode={mode === "logIn"} type="button" onClick={() => setMode("logIn")}>Log in</StyledButton>
      <StyledButton isCurrentMode={mode === "signUp"} type="button" onClick={() => setMode("signUp")}>Sign up</StyledButton>
    </StyledButtonContainer>
      {error && <span>{error.message}</span>}
      {loading && <Loader></Loader>}

      {error_s && <span>{error_s.message}</span>}
      {loading_s && <Loader></Loader>}

      <div id="form-inside">
        <label>
          Email
              <input
            type="email"
            value={email}
            onChange={e => setEmail((e.target as HTMLInputElement).value)}
          />
        </label>

        {mode === "signUp" &&
          (<><label>
            First name
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName((e.target as HTMLInputElement).value)}
            />
          </label>
            <label>
              Last name
        <input
                type="text"
                value={lastName}
                onChange={e => setLastName((e.target as HTMLInputElement).value)}
              />
            </label></>
          )}
        < label >
          Password
          < input
            type="password"
            value={password}
            onChange={e => setPassword((e.target as HTMLInputElement).value)}
          />
        </label>
        <StyledButton id="logIn" type="submit">{mode === "logIn" ? "log in" : "sign up"}</StyledButton>

      </div>
    </StyledForm >
  );
};


const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  max-width: 30rem;
  min-height: 12rem;
  justify-content: space-between;
  label{
    display: flex;
   flex-flow: column nowrap;
   color: ${({ theme }) => theme.colors.primary4};
  }
  input{
    background: none;
    width: 100%;
    margin-bottom: 0.2rem;
    align-self: center;
    min-height: 1.4rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary4};
  }
  button{
    color: white;
  }
  #form-inside{
    background: ${({ theme }) => theme.colors.primary1};
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    min-height: 80%;
    justify-content: space-evenly;
    padding: 1rem;
    #logIn{
      align-self: center;
      background: ${({ theme }) => theme.colors.primary3};
       min-width: 20%;
    }
}
`

interface StyledButtonProps {
  isCurrentMode?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
cursor: pointer;
padding: 0.3rem;
background: ${({ theme }) => theme.colors.primary2};
background: ${({ isCurrentMode, theme }) => isCurrentMode ? theme.colors.primary4 : theme.colors.primary2};
max-width: 10rem;
`
const StyledButtonContainer = styled.div`
max-height: 2rem;
display: flex;
flex-flow: row nowrap;
width: 100%;
justify-content: space-evenly;
align-items: center;
height: auto;

button{
  min-width: 40%;
}
`

