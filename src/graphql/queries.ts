import { gql } from "@apollo/client";
import { UserInfo, UserBooks, BookInfo, BookUsers } from "./fragments";

export const USERS_QUERY = gql`
  query users {
    users {
      ...UserInfo
    }
  }
  ${UserInfo}
`;

export const ME_QUERY = gql`
  query me {
    me {
      # chats{
      #   id
      #   name      
      #   isGroup @client
      #   # users{
      #   #   ...UserInfo
      #   # }
      ...UserInfo
      ...UserBooks       
    }
  }
  ${UserInfo}
  ${UserBooks}
`;

export const BOOKS_QUERY = gql`
  query books{
    books{
      ...BookInfo
      }
    }  
    ${BookInfo}
`
export const BOOK_QUERY = gql`
  query book($id:String){
    book(id:$id){
      ...BookInfo
      ...BookUsers
    }
  }
  ${BookInfo}
  ${BookUsers}
`
export const USER_QUERY = gql`
  query user($id:String){
    user(id:$id){
      ...UserInfo
      ...UserBooks
    }
  }
  ${BookInfo}
  ${BookUsers}
`