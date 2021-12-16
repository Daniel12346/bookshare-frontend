import { gql } from "@apollo/client";

export const UserDetails = gql`
  fragment UserDetails on User {
    firstName
    lastName
    id
    profileImageUrl
  }
`;




