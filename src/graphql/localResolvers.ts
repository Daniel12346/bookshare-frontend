import { Chat } from "./types";

export default {
  //a chat is a group if it has more than 2 users, meaning there's no need to make a separate Group entity on the backend
  Chat: {
    isGroup: (parent: Chat) => parent.users.length > 2
  }
};
