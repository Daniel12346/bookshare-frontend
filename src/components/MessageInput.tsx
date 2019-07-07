import React, { useState, FormEvent } from "react";
import { useCreateMessageMutation } from "graphql/types";
import styled from "styled-components";

interface Props {
  chatId: string;
}

export default function MessageInput({ chatId }: Props) {
  const createMessage = useCreateMessageMutation();

  const [content, setContent] = useState("");
  const handleSendMessage = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await createMessage({ variables: { content, chatId } });
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
