import React from "react";
import { useSignUpMutation } from "graphql/types";

//TODO: replace placeholder variables with actual ones
const Register = () => {
  const handleSignUp = useSignUpMutation({
    variables: {
      firstName: "Daniel",
      lastName: "Vrandečić",
      email: "danezoki2@gmail.com",
      password: "Danezoki2"
    }
  });
  return <button onClick={() => handleSignUp()}>Sign Up</button>;
};

export default Register;
