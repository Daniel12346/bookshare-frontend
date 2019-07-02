import React, { useState, FormEvent } from "react";
import { useCreateMessageMutation } from "graphql/types";
import styled from "styled-components";
import { ApolloQueryResult } from "apollo-client";

interface Props {
  chatId: string;
  refetchChat: () => Promise<ApolloQueryResult<any>>;
}

export default function MessageInput({ chatId, refetchChat }: Props) {
  const createMessage = useCreateMessageMutation();

  const [content, setContent] = useState("");
  const handleSendMessage = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const message = await createMessage({ variables: { content, chatId } });
      console.log(message);
      // await refetchChat();
      setContent("");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSendMessage}>
      <input value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">send</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: row;
  background: ${({ theme }) => theme.primary1};
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;

  input {
    flex: 5;
  }
  button {
    flex: 1;
  }
`;
