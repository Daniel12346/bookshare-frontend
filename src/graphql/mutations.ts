import gql from "graphql-tag";
import { UserDetails } from "./fragments";

export const LOGIN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    #returns a jwt (string)
    #todo: refactor auth data (return user data)
    logIn(email: $email, password: $password)
  }
`;
/*
export const LOGOUT_MUTATION = gql`
  mutation {
    logOut {
      success
    }
  }
`;
*/
export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      ...UserDetails
    }
  }
  ${UserDetails}
`;
