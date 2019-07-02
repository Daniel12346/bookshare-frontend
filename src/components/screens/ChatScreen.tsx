//import { useChatsQuery } from "graphql/types";
import React from "react";
import { RouteProps } from "types";
import {
  useChatQuery,
  useMessagesQuery,
  useMessageCreatedSubscription
} from "graphql/types";
import MessageInput from "components/MessageInput";
interface Props {
  chatId?: string;
}

export default (props: RouteProps<Props>) => {
  //the chatId prop is passed down by the router
  const { chatId } = props;
  const { data, loading, error, refetch } = useChatQuery({
    variables: { id: chatId }
  });
  useMessagesQuery();

  //TODO: loader
  if (loading) return <span>Loading...</span>;
  return (
    <>
      {data && data.chat && data.chat.messages.length ? (
        <>
          <ul style={{ flexFlow: "column wrap", margin: "5vh 0 10vh" }}>
            {data.chat.messages.map(
              message => message && <li key={message.id}>{message.content}</li>
            )}
          </ul>
          {chatId && <MessageInput chatId={chatId} refetchChat={refetch} />}
        </>
      ) : (
        <span>No messages found</span>
      )}
    </>
  );
};
