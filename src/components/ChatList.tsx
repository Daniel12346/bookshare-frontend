import React from "react";
import { useChatsQuery, Chat as IChat } from "graphql/types";
import Chat from "./Chat";
import styled from "styled-components";

export default () => {
  const { data, loading, error } = useChatsQuery();

  return (
    <StyledContainer>
      {loading && <span>Loading...</span>}
      {error && error.message}
      <StyledChatList>
        {data &&
          data.chats &&
          data.chats.map(chat => chat && <Chat chat={chat as IChat} />)}
      </StyledChatList>
    </StyledContainer>
  );
};
//TODO:

const StyledContainer = styled.div`
  padding-top: 5vh;
`;

const StyledChatList = styled.ul`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  list-style: none;
`;
