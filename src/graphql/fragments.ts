import gql from "graphql-tag";

export const UserDetails = gql`
  fragment UserDetails on User {
    firstName
    lastName
    id
  }
`;

export const MessageDetails = gql`
  fragment MessageDetails on Message {
    id

    content
    createdAt
  }
`;

export const ChatDetails = gql`
  fragment ChatDetails on Chat {
    id
    name

    createdAt
  }
`;
