import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
import * as ReactApollo from "react-apollo";
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
> & {
    from: { __typename?: "User" } & UserDetailsFragment;
    chat: { __typename?: "Chat" } & Pick<Chat, "id">;
  };

export type ChatDetailsFragment = { __typename?: "Chat" } & Pick<
  Chat,
  "id" | "name" | "createdAt"
> & {
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
    chat {
      id
    }
  }
  ${UserDetailsFragmentDoc}
`;
export const ChatDetailsFragmentDoc = gql`
  fragment ChatDetails on Chat {
    id
    name
    messages {
      ...MessageDetails
    }
    createdAt
  }
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
export const ChatsDocument = gql`
  query chats {
    chats {
      ...ChatDetails
    }
  }
  ${ChatDetailsFragmentDoc}
`;

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
