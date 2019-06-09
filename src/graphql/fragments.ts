import gql from "graphql-tag";

export const UserDetails = gql`
  fragment UserDetails on User {
    firstName
    lastName
    id
  }
`;
