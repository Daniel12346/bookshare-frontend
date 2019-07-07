//import { useChatsQuery } from "graphql/types";
import React from "react";
import { RouteProps } from "types";
import { useChatQuery, useMessagesQuery, useMeQuery } from "graphql/types";
import MessageInput from "components/MessageInput";
import styled from "styled-components";

interface Props {
  chatId?: string;
}

export default (props: RouteProps<Props>) => {
  //the chatId prop is passed down by the router
  const { chatId } = props;
  const { data, loading } = useChatQuery({
    variables: { id: chatId }
  });

  useMessagesQuery();
  const { data: meData } = useMeQuery();

  //TODO: loader
  if (loading) return <span>Loading...</span>;
  return (
    <>
      {meData && meData.me && data && data.chat && data.chat.messages.length ? (
        <StyledContainer>
          <StyledMessageList>
            {data.chat.messages.map(
              message =>
                message && (
                  <Message
                    senderId={message.from.id}
                    content={message.content}
                    createdAt={new Date(message.createdAt)}
                    myId={meData.me.id}
                    key={message.id}
                  />
                )
            )}
          </StyledMessageList>
          {chatId && <MessageInput chatId={chatId} />}
        </StyledContainer>
      ) : (
        <span>No messages found</span>
      )}
    </>
  );
};

const StyledMessageList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column wrap;
  margin: 5vh 0 10vh;
  max-width: 50rem;
`;

interface MessageProps {
  senderId: string;
  content: string;
  createdAt: Date;
  myId: string;
}

const Message = ({ senderId, content, createdAt, myId }: MessageProps) => (
  <StyledMessage isFromMe={senderId === myId}>
    <StyledCreationDate>
      {createdAt.toLocaleTimeString("hrv")}
    </StyledCreationDate>
    <StyledContent>{content}</StyledContent>
  </StyledMessage>
);

interface StyledMessageProps {
  isFromMe: boolean;
}
const StyledMessage = styled.li<StyledMessageProps>`
  display: flex;
  flex-flow: column nowrap;
  align-self: ${({ isFromMe }) => (isFromMe ? "flex-start" : "flex-end")};
  background: ${({ isFromMe }) => (isFromMe ? "lightgreen" : "lightblue")};
  border-radius: ${({ isFromMe }) => (isFromMe ? "0 5% 5% 0" : "5% 0 0 5%")};
  margin-bottom: 0.5rem;
  max-width: 85%;
  padding: 0.5rem;
  right: 0px;
`;

const StyledCreationDate = styled.span`
  font-size: 0.8rem;
`;

const StyledContent = styled.span`
  font-size: 1.4rem;
  flex-basis: 100%;
  padding: 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
