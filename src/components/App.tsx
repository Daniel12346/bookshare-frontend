import React from "react";
import { Router, Link } from "@reach/router";

import Users from "./Users";
import Login from "./Login";
import RouterPage from "./RouterPage";
import Me from "./Me";
import Nav from "./Nav";
import ChatScreen from "./screens/ChatScreen";
import Chats from "./Chats";
import GlobalStyle from "./styled/GlobalStyle";
import { useInitMessageCreatedSubscription } from "./hooks/graphql";
const App = () => {
  useInitMessageCreatedSubscription();
  return (
    <>
      <GlobalStyle />
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
    </>
  );
};

export default App;
