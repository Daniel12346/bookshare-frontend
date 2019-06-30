import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type Chat = {
  __typename?: "Chat";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  users: Array<Maybe<User>>;
  messages: Array<Maybe<Message>>;
  createdAt: Scalars["Date"];
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  content: Scalars["String"];
  from: User;
  chat: Chat;
  createdAt: Scalars["Date"];
};

export type MessageInput = {
  receiverId?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  deleteUser?: Maybe<MutationResult>;
  logIn?: Maybe<Scalars["String"]>;
  createMessage?: Maybe<Message>;
  createChat?: Maybe<Chat>;
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

export type MutationCreateMessageArgs = {
  chatId?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
};

export type MutationCreateChatArgs = {
  userId?: Maybe<Scalars["ID"]>;
  chatName?: Maybe<Scalars["String"]>;
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
  messages: Array<Maybe<Message>>;
  message?: Maybe<Message>;
  chats: Array<Maybe<Chat>>;
  chat: Chat;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryMessageArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryChatArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  messageCreated: Message;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  chats: Array<Maybe<Chat>>;
  messages: Array<Maybe<Message>>;
};

export type UserInput = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};
export type UserDetailsFragment = { __typename?: "User" } & Pick<
  User,
  "firstName" | "lastName" | "id"
>;

export type MessageDetailsFragment = { __typename?: "Message" } & Pick<
  Message,
  "id" | "content" | "createdAt"
> & { from: { __typename?: "User" } & UserDetailsFragment };

export type ChatDetailsFragment = { __typename?: "Chat" } & Pick<
  Chat,
  "id" | "name" | "createdAt"
> & {
    users: Array<Maybe<{ __typename?: "User" } & UserDetailsFragment>>;
    messages: Array<Maybe<{ __typename?: "Message" } & MessageDetailsFragment>>;
  };

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<Maybe<{ __typename?: "User" } & UserDetailsFragment>>;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & UserDetailsFragment;
};

export type ChatsQueryVariables = {};

export type ChatsQuery = { __typename?: "Query" } & {
  chats: Array<Maybe<{ __typename?: "Chat" } & ChatDetailsFragment>>;
};

export type ChatQueryVariables = {
  id?: Maybe<Scalars["ID"]>;
};

export type ChatQuery = { __typename?: "Query" } & {
  chat: { __typename?: "Chat" } & ChatDetailsFragment;
};

export type MessagesQueryVariables = {};

export type MessagesQuery = { __typename?: "Query" } & {
  messages: Array<Maybe<{ __typename?: "Message" } & MessageDetailsFragment>>;
};

export type MessageCreatedSubscriptionVariables = {};

export type MessageCreatedSubscription = { __typename?: "Subscription" } & {
  messageCreated: { __typename?: "Message" } & MessageDetailsFragment;
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

export type CreateMessageMutationVariables = {
  chatId?: Maybe<Scalars["ID"]>;
  content?: Maybe<Scalars["String"]>;
};

export type CreateMessageMutation = { __typename?: "Mutation" } & {
  createMessage: Maybe<{ __typename?: "Message" } & MessageDetailsFragment>;
};

export type CreateChatMutationVariables = {
  userId?: Maybe<Scalars["ID"]>;
  chatName?: Maybe<Scalars["String"]>;
};

export type CreateChatMutation = { __typename?: "Mutation" } & {
  createChat: Maybe<{ __typename?: "Chat" } & ChatDetailsFragment>;
};
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
  }
  ${UserDetailsFragmentDoc}
`;
export const ChatDetailsFragmentDoc = gql`
  fragment ChatDetails on Chat {
    id
    name
    users {
      ...UserDetails
    }
    messages {
      ...MessageDetails
    }
    createdAt
  }
  ${UserDetailsFragmentDoc}
  ${MessageDetailsFragmentDoc}
`;
export const UsersDocument = gql`
  query users {
    users {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`;
export type UsersComponentProps = Omit<
  Omit<ReactApollo.QueryProps<UsersQuery, UsersQueryVariables>, "query">,
  "variables"
> & { variables?: UsersQueryVariables };

export const UsersComponent = (props: UsersComponentProps) => (
  <ReactApollo.Query<UsersQuery, UsersQueryVariables>
    query={UsersDocument}
    {...props}
  />
);

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
export type MeComponentProps = Omit<
  Omit<ReactApollo.QueryProps<MeQuery, MeQueryVariables>, "query">,
  "variables"
> & { variables?: MeQueryVariables };

export const MeComponent = (props: MeComponentProps) => (
  <ReactApollo.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export const ChatsDocument = gql`
  query chats {
    chats {
      ...ChatDetails
    }
  }
  ${ChatDetailsFragmentDoc}
`;
export type ChatsComponentProps = Omit<
  Omit<ReactApollo.QueryProps<ChatsQuery, ChatsQueryVariables>, "query">,
  "variables"
> & { variables?: ChatsQueryVariables };

export const ChatsComponent = (props: ChatsComponentProps) => (
  <ReactApollo.Query<ChatsQuery, ChatsQueryVariables>
    query={ChatsDocument}
    {...props}
  />
);

export function useChatsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ChatsQueryVariables>
) {
  return ReactApolloHooks.useQuery<ChatsQuery, ChatsQueryVariables>(
    ChatsDocument,
    baseOptions
  );
}
export const ChatDocument = gql`
  query chat($id: ID) {
    chat(id: $id) {
      ...ChatDetails
    }
  }
  ${ChatDetailsFragmentDoc}
`;
export type ChatComponentProps = Omit<
  Omit<ReactApollo.QueryProps<ChatQuery, ChatQueryVariables>, "query">,
  "variables"
> & { variables?: ChatQueryVariables };

export const ChatComponent = (props: ChatComponentProps) => (
  <ReactApollo.Query<ChatQuery, ChatQueryVariables>
    query={ChatDocument}
    {...props}
  />
);

export function useChatQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ChatQueryVariables>
) {
  return ReactApolloHooks.useQuery<ChatQuery, ChatQueryVariables>(
    ChatDocument,
    baseOptions
  );
}
export const MessagesDocument = gql`
  query messages {
    messages {
      ...MessageDetails
    }
  }
  ${MessageDetailsFragmentDoc}
`;
export type MessagesComponentProps = Omit<
  Omit<ReactApollo.QueryProps<MessagesQuery, MessagesQueryVariables>, "query">,
  "variables"
> & { variables?: MessagesQueryVariables };

export const MessagesComponent = (props: MessagesComponentProps) => (
  <ReactApollo.Query<MessagesQuery, MessagesQueryVariables>
    query={MessagesDocument}
    {...props}
  />
);

export function useMessagesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MessagesQueryVariables>
) {
  return ReactApolloHooks.useQuery<MessagesQuery, MessagesQueryVariables>(
    MessagesDocument,
    baseOptions
  );
}
export const MessageCreatedDocument = gql`
  subscription messageCreated {
    messageCreated {
      ...MessageDetails
    }
  }
  ${MessageDetailsFragmentDoc}
`;
export type MessageCreatedComponentProps = Omit<
  Omit<
    ReactApollo.SubscriptionProps<
      MessageCreatedSubscription,
      MessageCreatedSubscriptionVariables
    >,
    "subscription"
  >,
  "variables"
> & { variables?: MessageCreatedSubscriptionVariables };

export const MessageCreatedComponent = (
  props: MessageCreatedComponentProps
) => (
  <ReactApollo.Subscription<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >
    subscription={MessageCreatedDocument}
    {...props}
  />
);

export function useMessageCreatedSubscription(
  baseOptions?: ReactApolloHooks.SubscriptionHookOptions<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >
) {
  return ReactApolloHooks.useSubscription<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >(MessageCreatedDocument, baseOptions);
}
export const LogInDocument = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;
export type LogInMutationFn = ReactApollo.MutationFn<
  LogInMutation,
  LogInMutationVariables
>;
export type LogInComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<LogInMutation, LogInMutationVariables>,
    "mutation"
  >,
  "variables"
> & { variables?: LogInMutationVariables };

export const LogInComponent = (props: LogInComponentProps) => (
  <ReactApollo.Mutation<LogInMutation, LogInMutationVariables>
    mutation={LogInDocument}
    {...props}
  />
);

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
export type SignUpMutationFn = ReactApollo.MutationFn<
  SignUpMutation,
  SignUpMutationVariables
>;
export type SignUpComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<SignUpMutation, SignUpMutationVariables>,
    "mutation"
  >,
  "variables"
> & { variables?: SignUpMutationVariables };

export const SignUpComponent = (props: SignUpComponentProps) => (
  <ReactApollo.Mutation<SignUpMutation, SignUpMutationVariables>
    mutation={SignUpDocument}
    {...props}
  />
);

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
export const CreateMessageDocument = gql`
  mutation createMessage($chatId: ID, $content: String) {
    createMessage(chatId: $chatId, content: $content) {
      ...MessageDetails
    }
  }
  ${MessageDetailsFragmentDoc}
`;
export type CreateMessageMutationFn = ReactApollo.MutationFn<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export type CreateMessageComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      CreateMessageMutation,
      CreateMessageMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: CreateMessageMutationVariables };

export const CreateMessageComponent = (props: CreateMessageComponentProps) => (
  <ReactApollo.Mutation<CreateMessageMutation, CreateMessageMutationVariables>
    mutation={CreateMessageDocument}
    {...props}
  />
);

export function useCreateMessageMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, baseOptions);
}
export const CreateChatDocument = gql`
  mutation createChat($userId: ID, $chatName: String) {
    createChat(userId: $userId, chatName: $chatName) {
      ...ChatDetails
    }
  }
  ${ChatDetailsFragmentDoc}
`;
export type CreateChatMutationFn = ReactApollo.MutationFn<
  CreateChatMutation,
  CreateChatMutationVariables
>;
export type CreateChatComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<CreateChatMutation, CreateChatMutationVariables>,
    "mutation"
  >,
  "variables"
> & { variables?: CreateChatMutationVariables };

export const CreateChatComponent = (props: CreateChatComponentProps) => (
  <ReactApollo.Mutation<CreateChatMutation, CreateChatMutationVariables>
    mutation={CreateChatDocument}
    {...props}
  />
);

export function useCreateChatMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateChatMutation,
    CreateChatMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateChatMutation,
    CreateChatMutationVariables
  >(CreateChatDocument, baseOptions);
}
