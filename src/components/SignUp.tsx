import React from "react";
import { useSignUpMutation } from "graphql/types";

//TODO: replace placeholder variables with actual ones
const SignUp = () => {
  const [signUp] = useSignUpMutation({
    variables: {
      firstName: "Daniel",
      lastName: "Vrandečić",
      email: "danezoki@gmail.com",
      password: "Danezoki"
    }
  });
  const handleSignUp = async () => {

    try {
      await signUp();
    } catch {
      console.log("Sign up failed");
    }
  }
  return <button onClick={() => handleSignUp()}>Sign Up</button>;
};

export default SignUp;
