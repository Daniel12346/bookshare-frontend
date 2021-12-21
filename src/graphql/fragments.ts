import { gql } from "@apollo/client";

export const UserInfo = gql`
  fragment UserInfo on User {
    firstName
    lastName
    id
    profileImageUrl
  }
`;

export const BookInfo = gql`
  fragment BookInfo on Book{
    id
    name
    author
    coverUrl
    year
  }
`



export const UserBooks = gql`
  fragment UserBooks on User {
   wanted{
     ...BookInfo
   }
   owned{
     ...BookInfo
   }
  }
  ${BookInfo}
`;

export const BookUsers = gql`
  fragment BookUsers on Book {
   wantedBy{
      ...UserInfo
   }
   ownedBy{
      ...UserInfo
   }
  }
  ${UserInfo}
`;

