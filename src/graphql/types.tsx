import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  author: Scalars['String'];
  name: Scalars['String'];
  year?: Maybe<Scalars['Int']>;
  ownedBy: Array<Maybe<User>>;
  wantedBy: Array<Maybe<User>>;
  coverUrl: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  profileImageUrl?: Maybe<Scalars['String']>;
  owned: Array<Maybe<Book>>;
  wanted: Array<Maybe<Book>>;
};



export type MutationResult = {
  __typename?: 'MutationResult';
  success?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  receiverId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<MutationResult>;
  createBook?: Maybe<Book>;
  deleteBook?: Maybe<MutationResult>;
  addBookToOwned?: Maybe<MutationResult>;
  addBookToWanted?: Maybe<MutationResult>;
  logIn?: Maybe<Scalars['String']>;
  uploadImage?: Maybe<MutationResult>;
};


export type MutationCreateUserArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationCreateBookArgs = {
  name?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
  coverUrl?: Maybe<Scalars['String']>;
};


export type MutationDeleteBookArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationAddBookToOwnedArgs = {
  userId?: Maybe<Scalars['ID']>;
  bookId?: Maybe<Scalars['ID']>;
};


export type MutationAddBookToWantedArgs = {
  userId?: Maybe<Scalars['ID']>;
  bookId?: Maybe<Scalars['ID']>;
};


export type MutationLogInArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationUploadImageArgs = {
  file?: Maybe<Scalars['Upload']>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  books: Array<Maybe<Book>>;
  book?: Maybe<Book>;
  user?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryBookArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'id' | 'profileImageUrl'>
);

export type BookInfoFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'name' | 'author' | 'coverUrl' | 'year'>
);

export type UserBooksFragment = (
  { __typename?: 'User' }
  & { wanted: Array<Maybe<(
    { __typename?: 'Book' }
    & BookInfoFragment
  )>>, owned: Array<Maybe<(
    { __typename?: 'Book' }
    & BookInfoFragment
  )>> }
);

export type BookUsersFragment = (
  { __typename?: 'Book' }
  & { wantedBy: Array<Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>>, ownedBy: Array<Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>> }
);

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logIn'>
);

export type SignUpMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & UserInfoFragment
  ) }
);

export type UploadImageMutationVariables = Exact<{
  file?: Maybe<Scalars['Upload']>;
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage?: Maybe<(
    { __typename?: 'MutationResult' }
    & Pick<MutationResult, 'success'>
  )> }
);

export type AddBookToWantedMutationVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
  bookId?: Maybe<Scalars['ID']>;
}>;


export type AddBookToWantedMutation = (
  { __typename?: 'Mutation' }
  & { addBookToWanted?: Maybe<(
    { __typename?: 'MutationResult' }
    & Pick<MutationResult, 'success'>
  )> }
);

export type AddBookToOwnedMutationVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
  bookId?: Maybe<Scalars['ID']>;
}>;


export type AddBookToOwnedMutation = (
  { __typename?: 'Mutation' }
  & { addBookToOwned?: Maybe<(
    { __typename?: 'MutationResult' }
    & Pick<MutationResult, 'success'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
    & UserBooksFragment
  )> }
);

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books: Array<Maybe<(
    { __typename?: 'Book' }
    & BookInfoFragment
  )>> }
);

export type BookQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type BookQuery = (
  { __typename?: 'Query' }
  & { book?: Maybe<(
    { __typename?: 'Book' }
    & BookInfoFragment
    & BookUsersFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
    & UserBooksFragment
  )> }
);

export const BookInfoFragmentDoc = gql`
    fragment BookInfo on Book {
  id
  name
  author
  coverUrl
  year
}
    `;
export const UserBooksFragmentDoc = gql`
    fragment UserBooks on User {
  wanted {
    ...BookInfo
  }
  owned {
    ...BookInfo
  }
}
    ${BookInfoFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  firstName
  lastName
  id
  profileImageUrl
}
    `;
export const BookUsersFragmentDoc = gql`
    fragment BookUsers on Book {
  wantedBy {
    ...UserInfo
  }
  ownedBy {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logIn(email: $email, password: $password)
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        return ApolloReactHooks.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, baseOptions);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UploadImageDocument = gql`
    mutation uploadImage($file: Upload) {
  uploadImage(file: $file) {
    success
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const AddBookToWantedDocument = gql`
    mutation addBookToWanted($userId: ID, $bookId: ID) {
  addBookToWanted(userId: $userId, bookId: $bookId) {
    success
  }
}
    `;
export type AddBookToWantedMutationFn = Apollo.MutationFunction<AddBookToWantedMutation, AddBookToWantedMutationVariables>;

/**
 * __useAddBookToWantedMutation__
 *
 * To run a mutation, you first call `useAddBookToWantedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookToWantedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookToWantedMutation, { data, loading, error }] = useAddBookToWantedMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useAddBookToWantedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddBookToWantedMutation, AddBookToWantedMutationVariables>) {
        return ApolloReactHooks.useMutation<AddBookToWantedMutation, AddBookToWantedMutationVariables>(AddBookToWantedDocument, baseOptions);
      }
export type AddBookToWantedMutationHookResult = ReturnType<typeof useAddBookToWantedMutation>;
export type AddBookToWantedMutationResult = Apollo.MutationResult<AddBookToWantedMutation>;
export type AddBookToWantedMutationOptions = Apollo.BaseMutationOptions<AddBookToWantedMutation, AddBookToWantedMutationVariables>;
export const AddBookToOwnedDocument = gql`
    mutation addBookToOwned($userId: ID, $bookId: ID) {
  addBookToOwned(userId: $userId, bookId: $bookId) {
    success
  }
}
    `;
export type AddBookToOwnedMutationFn = Apollo.MutationFunction<AddBookToOwnedMutation, AddBookToOwnedMutationVariables>;

/**
 * __useAddBookToOwnedMutation__
 *
 * To run a mutation, you first call `useAddBookToOwnedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookToOwnedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookToOwnedMutation, { data, loading, error }] = useAddBookToOwnedMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useAddBookToOwnedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddBookToOwnedMutation, AddBookToOwnedMutationVariables>) {
        return ApolloReactHooks.useMutation<AddBookToOwnedMutation, AddBookToOwnedMutationVariables>(AddBookToOwnedDocument, baseOptions);
      }
export type AddBookToOwnedMutationHookResult = ReturnType<typeof useAddBookToOwnedMutation>;
export type AddBookToOwnedMutationResult = Apollo.MutationResult<AddBookToOwnedMutation>;
export type AddBookToOwnedMutationOptions = Apollo.BaseMutationOptions<AddBookToOwnedMutation, AddBookToOwnedMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserInfo
    ...UserBooks
  }
}
    ${UserInfoFragmentDoc}
${UserBooksFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const BooksDocument = gql`
    query books {
  books {
    ...BookInfo
  }
}
    ${BookInfoFragmentDoc}`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        return ApolloReactHooks.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
      }
export function useBooksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const BookDocument = gql`
    query book($id: String) {
  book(id: $id) {
    ...BookInfo
    ...BookUsers
  }
}
    ${BookInfoFragmentDoc}
${BookUsersFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BookQuery, BookQueryVariables>) {
        return ApolloReactHooks.useQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
      }
export function useBookLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const UserDocument = gql`
    query user($id: String) {
  user(id: $id) {
    ...UserInfo
    ...UserBooks
  }
}
    ${UserInfoFragmentDoc}
${UserBooksFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;