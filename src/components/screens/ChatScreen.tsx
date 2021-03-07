//import { useChatsQuery } from "graphql/types";
import React from "react";
import { RouteProps } from "typings";
import { useChatQuery, useMessagesQuery, useMeQuery, User } from "graphql/types";
import MessageInput from "components/MessageInput";
import styled from "styled-components";

interface Props {
  chatId?: string;
}

export default (props: RouteProps<Props>) => {
  //the chatId prop is passed down by the router
  const { chatId } = props;
  const { data, loading } = useChatQuery({
    variables: { id: chatId },
  });
  //const chat = data?.chat;

  useMessagesQuery();
  const { data: meData } = useMeQuery();

  //TODO: loader
  if (loading) return <span>Loading...</span>;
  return (
    <StyledContainer>
      <StyledMessageList>
        {meData && data?.chat?.messages.map(
          (message) =>
            message && (
              <Message
                sender={message.from}
                content={message.content}
                createdAt={new Date(message.createdAt)}
                myId={meData?.me?.id!}
                key={message.id}
                withUserInfo={data.chat?.isGroup || false}
              />
            )
        )}
      </StyledMessageList>
      {chatId && <MessageInput chatId={chatId} />}
    </StyledContainer>
  );
};

const StyledMessageList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column wrap;
  margin: 2vh 0 8vh;
  max-width: 50rem;
  min-width: 60%;
`;

interface MessageProps {
  sender: Pick<User, "firstName" | "lastName" | "id" | "profileImageUrl">;
  content: string;
  createdAt: Date;
  myId: string;
  withUserInfo: boolean;
}

const Message = ({ sender, content, createdAt, myId, withUserInfo }: MessageProps) => (
  <StyledMessage isFromMe={sender.id === myId}>
    <StyledMessageInfo>
      <StyledCreationDate>
        {createdAt.toLocaleTimeString("hrv")}
      </StyledCreationDate>
      {withUserInfo && <StyledSenderInfo>{`${sender.firstName}`}</StyledSenderInfo>}
    </StyledMessageInfo>
    <StyledMessageContent>{content}</StyledMessageContent>
  </StyledMessage>
);

interface StyledMessageProps {
  isFromMe: boolean;
}
const StyledMessage = styled.li<StyledMessageProps>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  align-self: ${({ isFromMe }) => (isFromMe ? "flex-start" : "flex-end")};
  background: ${({ isFromMe }) => (isFromMe ? "lightgreen" : "lightblue")};
  border-radius: ${({ isFromMe }) => (isFromMe ? "0 5% 5% 0" : "5% 0 0 5%")};
  margin-bottom: 0.5rem;
  max-width: 85%;
  padding: 0.5rem;
  right: 0px;
  overflow-y: hidden;
  /*TODO: styling*/
  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    left: 5px;
    background: darkblue;
    border-radius: 10px;
    z-index: -1;
  }
`;

const StyledCreationDate = styled.span`
  min-height: 2rem;
  font-size: 0.8rem;
`;

const StyledSenderInfo = styled.span`
  min-height: 2rem;
  font-size: 0.8rem;
`;

const StyledMessageInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  overflow-y: hidden;
`

const StyledMessageContent = styled.span`
  font-size: 1.2rem;
  flex-basis: 100%;
  padding: 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
