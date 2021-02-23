import { gql } from "@apollo/client";
import { UserDetails, ChatDetails, MessageDetails } from "./fragments";

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

export const CHATS_QUERY = gql`
  query chats {
    chats {
      ...ChatDetails
    }
  }
  ${ChatDetails}
`;

export const CHAT_QUERY = gql`
  query chat($id: String) {
    chat(id: $id) {
      ...ChatDetails
    }
  }
  ${ChatDetails}
`;

export const MESSAGES_QUERY = gql`
  query messages {
    messages {
      ...MessageDetails
    }
  }
  ${MessageDetails}
`;
