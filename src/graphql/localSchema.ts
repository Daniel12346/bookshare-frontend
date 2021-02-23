import { gql } from "@apollo/client";

export default gql`
  extend type Chat {
    isGroup: Boolean!
  }
`;
