import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Chat } from "graphql/Chat";
import { Row } from "./styled/utils";
import { useChatQuery } from "graphql/types";
import { useMe } from "./hooks/me";
import ChatOptions from "./ChatOptions";
import StyledImage from "./StyledImage";
import StyledCard from "./StyledCard";

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
      (<StyledCard key={chatId}>
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
                            withBorder
                            withShadow
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
      </StyledCard>) : null
  );
};

const StyledChatInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  margin: 0 1rem;
`;

const StyledChatUsersList = styled.div`
  color: ${({ theme }) => theme.colors.text2};
  font-size: 0.9rem;
  padding-left: 0.1rem;
  >*{
    margin: 0.3rem -0.24rem 0.3rem 0;
  }
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
