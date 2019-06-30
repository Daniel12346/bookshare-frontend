import gql from "graphql-tag";
import { UserDetails, MessageDetails, ChatDetails } from "./fragments";

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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($chatId: ID, $content: String) {
    createMessage(chatId: $chatId, content: $content) {
      ...MessageDetails
    }
  }
  ${MessageDetails}
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation createChat($userId: ID, $chatName: String) {
    createChat(userId: $userId, chatName: $chatName) {
      ...ChatDetails
    }
  }
  ${ChatDetails}
`;
