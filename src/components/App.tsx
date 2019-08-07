import React, { ReactNode } from "react";
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
import { Location } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";

export default () => {
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

      <MotionRouter>
        <RouterPage component={<ChatList />} path="/" />
        <ChatScreen path="/chats/:chatId" />
        <RouterPage component={<Login />} path="/login" />

        <RouterPage component={<UserList />} path="/users" />
        <RouterPage component={<Me />} path="/me" />
      </MotionRouter>
    </>
  );
};

interface MotionRouterProps {
  children: ReactNode;
}

const MotionRouter = ({ children }: MotionRouterProps) => (
  <Location>
    {({ location }) => (
      <AnimatePresence>
        <motion.div
          animate={{ transition: { when: "afterChildren", delay: 300 } }}
          exit={{
            opacity: 0.3,
            x: "100%"
          }}
          key={location.key}
        >
          <Router location={location}>{children}</Router>
        </motion.div>
      </AnimatePresence>
    )}
  </Location>
);
