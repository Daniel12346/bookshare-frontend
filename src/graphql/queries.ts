import gql from "graphql-tag";
import { UserDetails } from "./fragments";

export const USERS_QUERY = gql`
  query users {
    users {
      ...UserDetails
    }
  }
  ${UserDetails}
`;

export const ME_QUERY = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetails}
`;
