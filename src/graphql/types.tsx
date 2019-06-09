import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
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

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  deleteUser?: Maybe<MutationResult>;
  logIn?: Maybe<Scalars["String"]>;
};

export type MutationCreateUserArgs = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationDeleteUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type MutationLogInArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationResult = {
  __typename?: "MutationResult";
  success?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  users: Array<Maybe<User>>;
  user: User;
  me: User;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};
export type UserDetailsFragment = { __typename?: "User" } & Pick<
  User,
  "firstName" | "lastName" | "id"
>;

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<Maybe<{ __typename?: "User" } & UserDetailsFragment>>;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & UserDetailsFragment;
};

export type LogInMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LogInMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logIn"
>;

export type SignUpMutationVariables = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignUpMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & UserDetailsFragment;
};
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    firstName
    lastName
    id
  }
`;
export const UsersDocument = gql`
  query users {
    users {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;

export function useUsersQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UsersQueryVariables>
) {
  return ReactApolloHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export const LogInDocument = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;
export type LogInMutationFn = ReactApolloHooks.MutationFn<
  LogInMutation,
  LogInMutationVariables
>;

export function useLogInMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogInMutation,
    LogInMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LogInMutation, LogInMutationVariables>(
    LogInDocument,
    baseOptions
  );
}
export const SignUpDocument = gql`
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
  ${UserDetailsFragmentDoc}
`;
export type SignUpMutationFn = ReactApolloHooks.MutationFn<
  SignUpMutation,
  SignUpMutationVariables
>;

export function useSignUpMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions
  );
}
