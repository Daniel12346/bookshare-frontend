import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Chat } from "graphql/types";
import { Row } from "./styled/utils";

interface Props {
  chat: Chat;
}

export default ({ chat }: Props) => {
  return (
    <StyledChat key={chat.id} onClick={() => navigate(`chats/${chat.id}`)}>
      <StyledChatImage
        src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg"
        large
      />
      <StyledChatInfo>
        <StyledChatName>{chat.name}</StyledChatName>
        <Row>
          <StyledChatImage src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg" />
          <StyledChatImage src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg" />
          <StyledChatImage src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg" />
          {chat.users &&
            chat.users.map(
              user =>
                user && (
                  <StyledChatUsersList>
                    <StyledChatImage src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg" />
                    {user.firstName}
                  </StyledChatUsersList>
                )
            )}
        </Row>
      </StyledChatInfo>
      <StyledChatOptions>
        {chat.isGroup ? "group options" : "user options"}
      </StyledChatOptions>
    </StyledChat>
  );
};

const StyledChat = styled.li`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 90%;
  max-width: 40rem;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  min-height: 5rem;
  margin-bottom: 4vh;
  cursor: pointer;
  background: white;
  > img {
    flex: 0 0 auto;
  }
`;

interface StyledChatImageProps {
  large?: boolean;
}

const StyledChatImage = styled.img<StyledChatImageProps>`
  height: ${({ large }) => (large ? "6rem" : "2.5rem")};
  width: ${({ large }) => (large ? "6rem" : "2.5rem")};
  left: 0;
  display: block;
  align-self: center;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  position: relative;

  border: 5px white solid;
`;
const StyledChatInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  margin: 0 1rem;
`;

const StyledChatUsersList = styled.div`
  color: ${({ theme }) => theme.colors.text2};
  font-size: 0.9rem;
`;

const StyledChatName = styled.span`
  font-size: 1.3rem;
  margin: 0.7rem 0;
`;

const StyledChatOptions = styled.ul`
  list-style: none;
  flex: 1 0 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  min-height: 2rem;
  background: ${({ theme }) => theme.colors.primary2};
  border-radius: 0 0 15px 15px;
  margin-top: 0.5rem;
`;
