import { gql } from "@apollo/client";
import { UserDetails } from "./fragments";

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



export const UPLOAD_IMAGE_MUTATION = gql`
  mutation uploadImage($file: Upload){
    uploadImage(file: $file){
      success
    }
  }
`

export const ADD_BOOK_TO_WISHLIST_MUTATION = gql`
  mutation addBookToWanted($userId: ID, $bookId: ID){
    addBookToWanted(userId: $userId, bookId: $bookId){
      success
    }
  }
`
export const ADD_BOOK_TO_MY_BOOKS_MUTATION = gql`
  mutation addBookToOwned($userId: ID, $bookId: ID){
    addBookToOwned(userId: $userId, bookId: $bookId){
      success
    }
  }
`
