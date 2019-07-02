import React from "react";
import { Router, Link } from "@reach/router";

import Users from "./Users";
import Login from "./Login";
import RouterPage from "./RouterPage";
import Me from "./Me";
import Nav from "./Nav";
import ChatScreen from "./screens/ChatScreen";
import Chats from "./Chats";
import {
  useMessageCreatedSubscription,
  ChatDetailsFragmentDoc,
  Chat
} from "graphql/types";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
const App = () => {
  useMessageCreatedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      // const { messages } = client.readQuery({ query: MESSAGES_QUERY }) as any;

      alert("MESSAGE");
      const newMessage =
        subscriptionData &&
        subscriptionData.data &&
        subscriptionData.data.messageCreated;
      //updating the query in the cache if the message has been received
      if (newMessage) {
        console.log(newMessage);

        const chat = { __typename: "Chat", id: newMessage.chat.id };

        const chatId = defaultDataIdFromObject(chat);
        if (chatId) {
          const chatData = client.readFragment<Chat>({
            id: chatId,
            fragment: ChatDetailsFragmentDoc,
            fragmentName: "ChatDetails"
          });
          if (chatData) {
            console.log(chatData);
            client.writeFragment({
              id: chatId,
              fragment: ChatDetailsFragmentDoc,
              fragmentName: "ChatDetails",
              data: {
                ...chatData,
                messages: [...chatData.messages, newMessage]
              }
            });
          }
        }
      }
      /*console.log(subscriptionData)
      if (newMessage) {
        client.writeQuery({
          query: MESSAGES_QUERY,
          data: { messages: [newMessage, ...messages] }
        });
      }*/
    }
  });
  return (
    <div className="App">
      <Nav>
        <Link to="/">chats</Link>
        <Link to="/users">users</Link>
        <Link to="/me">me</Link>
      </Nav>
      <Router>
        <RouterPage component={<Chats />} path="/" />
        <ChatScreen path="/chats/:chatId" />
        <RouterPage component={<Login />} path="/login" />

        <RouterPage component={<Users />} path="/users" />
        <RouterPage component={<Me />} path="/me" />
      </Router>
    </div>
  );
};

export default App;
