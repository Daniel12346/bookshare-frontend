import React from "react";
import Chat from "./Chat";

//the interface is imported as IChat to name clashes with the Chat component
import { useChatsQuery } from "graphql/types";
import { Chat as IChat } from "graphql/Chat";
import styled from "styled-components";

export default () => {
  const { data, loading, error } = useChatsQuery();

  return (
    <StyledContainer>
      {loading && <span>Loading...</span>}
      {error?.message}
      <StyledChatList>
        {data?.chats?.map(
          (chat) => chat && <Chat key={chat.id} chat={chat as IChat} />
        )}
      </StyledChatList>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-top: 5vh;
`;

const StyledChatList = styled.ul`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  list-style: none;
  width: 100%;
`;
