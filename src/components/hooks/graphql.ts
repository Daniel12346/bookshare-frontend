import {
  useMessageCreatedSubscription,
  ChatDetailsFragmentDoc
} from "graphql/types";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import { Chat } from "graphql/types";

//sets up the useMessageCreatedSubscription hook to update the chats in the cache when a message is received
export const useInitMessageCreatedSubscription = () => {
  useMessageCreatedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage =
        subscriptionData &&
        subscriptionData.data &&
        subscriptionData.data.messageCreated;
      if (newMessage) {
        //an object containing the typename and the id of the chat that needs to be updated (the chat where the message was sent)
        const chat = { __typename: "Chat", id: newMessage.chat.id };

        //chatCacheId is not the same as the id property of the chat object passed as the argument,
        //it is the id which is generated and used by the cache
        const chatCacheId = defaultDataIdFromObject(chat);
        if (chatCacheId) {
          const chatData = client.readFragment<Chat>({
            id: chatCacheId,
            fragment: ChatDetailsFragmentDoc,
            fragmentName: "ChatDetails"
          });
          if (chatData) {
            client.writeFragment({
              id: chatCacheId,
              fragment: ChatDetailsFragmentDoc,
              fragmentName: "ChatDetails",
              data: {
                ...chatData,
                //updating the chat by adding the new message to its array of messages and writing the chat fragment to the cache
                messages: [...chatData.messages, newMessage]
              }
            });
          }
        }
      }
    }
  });
};
