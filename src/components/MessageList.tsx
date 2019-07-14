import React, { useState } from "react";
import {
  useMessagesQuery,
  useMessageCreatedSubscription,
  Message
} from "graphql/types";
import { MESSAGES_QUERY } from "graphql/queries";
import { byDateDesc } from "utils";

const Messages = () => {
  //message content
  const [content, setContent] = useState("");

  const { data, loading, error } = useMessagesQuery();

  //TODO: refactor completely
  return (
    <>
      <form>
        <label>
          Message
          <input
            type="text"
            value={content}
            onChange={e => setContent((e.target as HTMLInputElement).value)}
          />
        </label>

        <button>Send</button>
      </form>

      {loading && <span>Loading...</span>}
      {error && <span>{error.message}</span>}
      <ul>
        {data &&
          data.messages &&
          data.messages
            .sort(byDateDesc)
            .map(
              message => message && <li key={message.id}>{message.content}</li>
            )}
      </ul>
    </>
  );
};
export default Messages;
