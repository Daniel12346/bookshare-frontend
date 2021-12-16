import React, { ReactNode } from "react";
import { Router, Link } from "@reach/router";
import { Location } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";
import UserList from "./UserList";
import RouterPage from "./RouterPage";
import Nav from "./Nav";
import GlobalStyle from "./styled/GlobalStyle";
import { useMeQuery } from "graphql/types";
import AuthScreen from "./screens/AuthScreen";
import MeScreen from "./screens/MeScreen";
import styled from "styled-components";
import StyledUserInfo from "./StyledUserInfo";
import StyledImage from "./StyledImage";

export default () => {
  const { data, error } = useMeQuery();

  return (
    <>
      <GlobalStyle />
      {error && <span>{error.message.toUpperCase() !== "NOT AUTHENTICATED" && error.message}</span>}
      {console.log(data)}
      {!error && data?.me ?
        (<>
          <Nav>
            <StyledUserInfo>
              <StyledImage src={data.me.profileImageUrl || ""} alt={`${data.me}'s profile`}></StyledImage>
              <span>{`${data.me.firstName}`}</span>
            </StyledUserInfo>
            <StyledLinksContainer>
              <StyledLink to="/users">wishlist</StyledLink>
              <StyledLink to="/me">my books</StyledLink>
            </StyledLinksContainer>
          </Nav>

          <MotionRouter>
            {/* <RouterPage component={<ChatList />} path="/" /> */}
            {/* <ChatScreen path="/chats/:chatId" /> */}
            <RouterPage component={<AuthScreen />} path="/auth" />
            <RouterPage component={<UserList />} path="/users" />
            <RouterPage component={<MeScreen />} path="/" />
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

const StyledLinksContainer = styled.div`
display: flex;
min-width: 20%;
flex-flow: row nowrap;
justify-content: space-between;
`

const StyledLink = styled(Link)`
  display: flex;
  color: white;
  text-decoration: none;
  border: 3px solid white;
  border-radius: 2rem;
  text-align: center;
  justify-content: center;
  padding: 0.2rem 1rem;
  font-size: 1rem;
  min-width: 2rem; 
`