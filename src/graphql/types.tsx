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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  messages: Array<Maybe<Message>>;
};


export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isGroup: Scalars['Boolean'];
  messages: Array<Maybe<Message>>;
  name?: Maybe<Scalars['String']>;
  users: Array<Maybe<User>>;
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
  logIn?: Maybe<Scalars['String']>;
  createMessage?: Maybe<Message>;
  createChat?: Maybe<Chat>;
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


export type MutationLogInArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationCreateMessageArgs = {
  receiverId?: Maybe<Scalars['ID']>;
  chatId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
};


export type MutationCreateChatArgs = {
  userId?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  user: User;
  me: User;
  messages: Array<Maybe<Message>>;
  chats: Array<Maybe<Chat>>;
  chat: Chat;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryChatArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  content: Scalars['String'];
  from: User;
  chat: Chat;
  createdAt: Scalars['Date'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated: Message;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'id'>
);

export type MessageDetailsFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'content' | 'createdAt'>
  & { from: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ), chat: (
    { __typename?: 'Chat' }
    & Pick<Chat, 'id'>
  ) }
);

export type ChatDetailsFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, 'id' | 'name' | 'createdAt' | 'isGroup'>
  & { messages: Array<Maybe<(
    { __typename?: 'Message' }
    & MessageDetailsFragment
  )>>, users: Array<Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
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
    & UserDetailsFragment
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  chatId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage?: Maybe<(
    { __typename?: 'Message' }
    & MessageDetailsFragment
  )> }
);

export type CreateChatMutationVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & { createChat?: Maybe<(
    { __typename?: 'Chat' }
    & ChatDetailsFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { chats: Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatDetailsFragment
  )>> }
);

export type ChatQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { chat: (
    { __typename?: 'Chat' }
    & ChatDetailsFragment
  ) }
);

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<Maybe<(
    { __typename?: 'Message' }
    & MessageDetailsFragment
  )>> }
);

export type MessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { messageCreated: (
    { __typename?: 'Message' }
    & MessageDetailsFragment
  ) }
);

export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on User {
  firstName
  lastName
  id
}
    `;
export const MessageDetailsFragmentDoc = gql`
    fragment MessageDetails on Message {
  id
  from {
    ...UserDetails
  }
  content
  createdAt
  chat {
    id
  }
}
    ${UserDetailsFragmentDoc}`;
export const ChatDetailsFragmentDoc = gql`
    fragment ChatDetails on Chat {
  id
  name
  messages {
    ...MessageDetails
  }
  createdAt
  users {
    ...UserDetails
  }
  isGroup @client
}
    ${MessageDetailsFragmentDoc}
${UserDetailsFragmentDoc}`;
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
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;
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
export const CreateMessageDocument = gql`
    mutation createMessage($chatId: ID, $content: String) {
  createMessage(chatId: $chatId, content: $content) {
    ...MessageDetails
  }
}
    ${MessageDetailsFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateChatDocument = gql`
    mutation createChat($userId: ID) {
  createChat(userId: $userId) {
    ...ChatDetails
  }
}
    ${ChatDetailsFragmentDoc}`;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, baseOptions);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;

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
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;

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
export const ChatsDocument = gql`
    query chats {
  chats {
    ...ChatDetails
  }
}
    ${ChatDetailsFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        return ApolloReactHooks.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
      }
export function useChatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const ChatDocument = gql`
    query chat($id: String) {
  chat(id: $id) {
    ...ChatDetails
  }
}
    ${ChatDetailsFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        return ApolloReactHooks.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
      }
export function useChatLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const MessagesDocument = gql`
    query messages {
  messages {
    ...MessageDetails
  }
}
    ${MessageDetailsFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageCreatedDocument = gql`
    subscription messageCreated {
  messageCreated {
    ...MessageDetails
  }
}
    ${MessageDetailsFragmentDoc}`;

/**
 * __useMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>(MessageCreatedDocument, baseOptions);
      }
export type MessageCreatedSubscriptionHookResult = ReturnType<typeof useMessageCreatedSubscription>;
export type MessageCreatedSubscriptionResult = Apollo.SubscriptionResult<MessageCreatedSubscription>;