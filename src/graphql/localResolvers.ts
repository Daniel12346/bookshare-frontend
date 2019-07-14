import { Chat } from "./types";

export default {
  Chat: {
    isGroup: (parent: Chat) => parent.messages.length > 2
  }
};
