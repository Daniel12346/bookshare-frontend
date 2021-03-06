import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Chat } from "graphql/Chat";
import { Row } from "./styled/utils";
import { useChatQuery } from "graphql/types";
import { useMe } from "./hooks/me";
import ChatOptions from "./ChatOptions";

interface Props {
  chatId: string;
}

export default ({ chatId }: Props) => {
  const { data, error } = useChatQuery({ variables: { id: chatId } });
  const chat = data?.chat;
  const { id: myId } = useMe();
  const otherUser = chat?.users.find(user => user?.id !== myId);

  if (error) return <span>{error.message}</span>;
  return (
    data?.chat ?
      (<StyledChat key={chatId}>
        <StyledImage
          onClick={() => navigate(`chats/${chatId}`)}
          src={otherUser?.profileImageUrl || ""}
          large
        />
        <StyledChatInfo onClick={() => navigate(`chats/${chatId}`)}>
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
                          <StyledImage
                            key={user.id}
                            src={user.profileImageUrl || ""}
                          />
                        </StyledChatUsersList>
                      )
                  )}
                </Row>
              </>
            )
          }
        </StyledChatInfo>
        <ChatOptions chat={data?.chat as Chat}></ChatOptions>
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

interface StyledImageProps {
  large?: boolean;
}

const StyledImage = styled.img<StyledImageProps>`
  height: ${({ large }) => (large ? "6rem" : "2.5rem")};
  width: ${({ large }) => (large ? "6rem" : "2.5rem")};
  display: block;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
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


//TODO: find a better name for this components
const StyledUsersSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary4};
  text-transform: uppercase;
  letter-spacing: 0.8;
  font-size: 0.8rem;
  font-weight: bold;
`;
