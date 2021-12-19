import { gql } from "@apollo/client";
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
      # chats{
      #   id
      #   name      
      #   isGroup @client
      #   # users{
      #   #   ...UserDetails
      #   # }
      ...UserDetails

       
    }
  }
  ${UserDetails}
`;

export const BOOKS_QUERY = gql`
  query books{
    books {
      id
      name
      author
      coverUrl
      year
    }
  }
`

