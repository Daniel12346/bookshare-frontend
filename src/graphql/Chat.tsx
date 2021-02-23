import { Scalars, Maybe, User, Message } from "./types";

export type Chat = {
  __typename?: "Chat";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  users: Array<Maybe<User>>;
  messages: Array<Maybe<Message>>;
  createdAt: Scalars["Date"];
  isGroup: Scalars["Boolean"];
};
