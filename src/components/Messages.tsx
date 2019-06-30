import React, { useState } from "react";
import { useMessagesQuery, useMessageCreatedSubscription } from "graphql/types";
import { MESSAGES_QUERY } from "graphql/queries";

const Messages = () => {
  //message content
  const [content, setContent] = useState("");

  const { data, loading, error } = useMessagesQuery();

  //the values this hook would return are not needed because the query above fetches all the messages,
  //and this subscription updates the cache whenever new messages are received which updates the data the query returns
  useMessageCreatedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { messages } = client.readQuery({ query: MESSAGES_QUERY }) as any;
      const newMessage =
        subscriptionData &&
        subscriptionData.data &&
        subscriptionData.data.messageCreated;
      //updating the query in the cache if the message has been received
      if (newMessage) {
        client.writeQuery({
          query: MESSAGES_QUERY,
          //TODO: sorting
          data: { messages: [newMessage, ...messages] }
        });
      }
    }
  });
  // const [skip, setSkip] = useState(true);

  /*const createMessage = useCreateMessageMutation();
  const handleSendMessage = async (e: FormEvent) => {
    console.log(content);
    e.preventDefault();
    await createMessage({
      variables: {
        content,
        chatId:
      }
    });
    setContent("");
  };
  
  const { data, loading, error } = useMessageCreatedSubscription({ skip });
  console.log(data, loading, error);*/

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
          data.messages.map(
            message => message && <li key={message.id}>{message.content}</li>
          )}
      </ul>
    </>
  );
};
export default Messages;
