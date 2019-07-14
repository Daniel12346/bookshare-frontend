import React from "react";
import { Router, Link } from "@reach/router";

import UserList from "./UserList";
import Login from "./Login";
import RouterPage from "./RouterPage";
import Me from "./Me";
import Nav from "./Nav";
import ChatScreen from "./screens/ChatScreen";
import ChatList from "./ChatList";
import GlobalStyle from "./styled/GlobalStyle";
import { useInitMessageCreatedSubscription } from "./hooks/graphql";
const App = () => {
  useInitMessageCreatedSubscription();
  return (
    <>
      <GlobalStyle />
      <Nav>
        <span>//TODO:icon</span>
        <Link to="/">chats</Link>
        <Link to="/users">users</Link>
        <Link to="/me">me</Link>
        <Link to="/settings">settings</Link>
      </Nav>

      <Router>
        <RouterPage component={<ChatList />} path="/" />
        <ChatScreen path="/chats/:chatId" />
        <RouterPage component={<Login />} path="/login" />

        <RouterPage component={<UserList />} path="/users" />
        <RouterPage component={<Me />} path="/me" />
      </Router>
    </>
  );
};

export default App;
