import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Chat } from "graphql/Chat";
import { Row } from "./styled/utils";
import { useChatQuery } from "graphql/types";

interface Props {
  chatId: string;
}

export default ({ chatId }: Props) => {
  const { data, loading, error } = useChatQuery({ variables: { id: chatId } });
  const chat = data?.chat;

  if (error) return <span>{error.message}</span>;
  return (
    data?.chat ?
      (<StyledChat key={chatId} onClick={() => navigate(`chats/${chatId}`)}>
        <StyledChatImage
          src="user_placeholder.png"
          large
        />
        <StyledChatInfo>
          {//TODO: lipše napisat
          }
          <StyledChatName>{data.chat?.isGroup ? data?.chat?.name : `${data.chat.users[0]?.firstName} ${data.chat.users[0]?.lastName}`}</StyledChatName>

          {
            chat?.isGroup && (
              <>
                <StyledUsersSpan>users</StyledUsersSpan>
                <Row>
                  {chat.users.map(
                    (user) =>
                      user && (
                        <StyledChatUsersList key={user.id}>
                          <StyledChatImage
                            key={user.id}
                            src="https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg"
                          />
                          {user.firstName}
                        </StyledChatUsersList>
                      )
                  )}
                </Row>
              </>
            )
          }
        </StyledChatInfo>
        <StyledChatOptions>
          {
            //TODO
            chat?.isGroup ? "group options" : "user options"
          }
        </StyledChatOptions>
      </StyledChat>) : null
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
  margin-bottom: 6vh;
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

//TODO: find a better name for this components
const StyledUsersSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary2};
  text-transform: uppercase;
  letter-spacing: 0.8;
  font-size: 0.8rem;
  font-weight: bold;
`;
