import React, { ReactNode } from "react";
import { Router, Link } from "@reach/router";
import { Location } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";
import UserList from "./UserList";
import Login from "./Auth";
import RouterPage from "./RouterPage";
import Nav from "./Nav";
// import ChatList from "./ChatList";
import GlobalStyle from "./styled/GlobalStyle";
import SignUp from "./SignUp";
import { useMeQuery } from "graphql/types";
import AuthScreen from "./screens/AuthScreen";
import MeScreen from "./screens/MeScreen";
import { ReactComponent as Logo } from "images/chat_logo.svg"
import styled from "styled-components";

export default () => {
  const { data, error } = useMeQuery();
  // useInitMessageCreatedSubscription();

  return (
    <>
      <GlobalStyle />
      {error && <span>{error.message.toUpperCase() !== "NOT AUTHENTICATED" && error.message}</span>}
      {console.log(data)}
      {!error && data?.me ?
        (<>
          <Nav>
            <StyledSpan><Logo width="60px"
              height="60px"></Logo></StyledSpan>
            <Link to="/users">users</Link>
            <Link to="/me">me</Link>
          </Nav>

          <MotionRouter>
            {/* <RouterPage component={<ChatList />} path="/" /> */}
            {/* <ChatScreen path="/chats/:chatId" /> */}
            <RouterPage component={<AuthScreen />} path="/auth" />
            <RouterPage component={<UserList />} path="/users" />
            <RouterPage component={<MeScreen />} path="/me" />
          </MotionRouter>
        </>)
        : <AuthScreen></AuthScreen>
      }
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
            x: "100%",
          }}
          key={location.key}
        >
          <Router location={location}>{children}</Router>
        </motion.div>
      </AnimatePresence>
    )}
  </Location>
);

const StyledSpan = styled.span`background: white`