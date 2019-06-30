import React from "react";
import { useChatsQuery } from "graphql/types";
import { navigate } from "@reach/router";

export default () => {
  const { data, loading, error } = useChatsQuery();
  return (
    <>
      {loading && <span>Loading...</span>}
      {error && error.message}
      <ul>
        {data &&
          data.chats &&
          data.chats.map(
            chat =>
              chat && (
                <li key={chat.id} onClick={() => navigate(`chats/${chat.id}`)}>
                  {chat.name + " " + chat.createdAt + " " + chat.id}
                </li>
              )
          )}
      </ul>
    </>
  );
};
