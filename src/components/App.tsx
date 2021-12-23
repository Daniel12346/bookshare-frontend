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
import Loader from "./Loader";
import UserScreen from "./screens/UserScreen";
import MyBooksScreen from "./screens/MyBooksScreen";
import WishlistScreen from "./screens/WishlistScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { ReactComponent as LibraryIcon } from "images/library-book-svgrepo-com.svg"
import BookScreen from "./screens/BookScreen";


export default () => {
  const { data, error, loading } = useMeQuery();

  return (
    <>
      <GlobalStyle />
      {error && <span>{error.message.toUpperCase() !== "NOT AUTHENTICATED" && error.message}</span>}
      {console.log(data)}
      {loading ? <StyledMainLoaderContainer><Loader></Loader></StyledMainLoaderContainer> : !error && data?.me ?
        (<>
          <Nav>{
          }
            <StyledUserInfo>
              <Link to={`/user/${data.me.id}`}>
                <StyledImage src={data.me.profileImageUrl || ""} alt={`${data.me?.firstName}'s profile`}></StyledImage>
              </Link>
              <span>{`${data.me.firstName}`}</span>
            </StyledUserInfo>
            <StyledLinksContainer>
              <StyledLink to="/users">users</StyledLink>
              <StyledLink to="/my_books">my books</StyledLink>
              <StyledLink to="/wishlist">wishlist</StyledLink>
              <StyledLink to="/books" style={{ border: "none" }}><LibraryIcon width="1.1rem" fill="white"></LibraryIcon></StyledLink>
            </StyledLinksContainer>
          </Nav>

          <MotionRouter>
            {/* <RouterPage component={<ChatList />} path="/" /> */}
            <RouterPage component={<AuthScreen />} path="/auth" />
            <RouterPage component={<UserList />} path="/users" />
            <RouterPage component={<UserScreen />} path="/user/:userId" />
            <RouterPage component={<MyBooksScreen />} path="/"></RouterPage>
            <RouterPage component={<MyBooksScreen />} path="my_books"></RouterPage>
            <RouterPage component={<WishlistScreen />} path="wishlist"></RouterPage>
            <RouterPage component={<LibraryScreen />} path="books"></RouterPage>
            <RouterPage component={<BookScreen />} path="book/:bookId"></RouterPage>


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
    {({ location }) => <Router location={location}>{children}</Router>}
  </Location>
);

// <AnimatePresence>
//   <motion.div
//     animate={{ transition: { when: "afterChildren", delay: 300 } }}
//     exit={{
//       opacity: 0.3,
//       x: "100%",
//     }}
//     key={location.key}
//   >


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
const StyledMainLoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`