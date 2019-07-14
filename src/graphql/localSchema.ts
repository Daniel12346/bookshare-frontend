import gql from "graphql-tag";

export default gql`
  extend type Chat {
    isGroup: Boolean!
  }
`;
