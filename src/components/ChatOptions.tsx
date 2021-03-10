import React from "react"
import { Chat, User, useRemoveUserFromChatMutation } from "graphql/types";
import styled from "styled-components"
import AddUserToChat from "./AddUserToChat";
import { useMe } from "./hooks/me";
import { ME_QUERY } from "graphql/queries";


interface Props {
    chat: Chat
}

export default ({ chat }: Props) => {
    const { id: myId } = useMe();
    const [removeUserFromChat, { error }] = useRemoveUserFromChatMutation({
        //manually updating the cache so that the chat the user left is no longer displayed 
        update: (proxy, data) => {
            const prevMeData: any = proxy.readQuery({ query: ME_QUERY });
            const updatedChats = prevMeData.me?.chats.filter((chat: Chat) => chat?.id != data.data?.removeUserFromChat?.id);
            proxy.writeQuery({ query: ME_QUERY, data: { ...prevMeData.me, me: { ...prevMeData, chats: updatedChats } } });
        }
    });
    return (<StyledChatOptions isGroup={chat.isGroup}>
        {chat.isGroup ?
            <>
                <AddUserToChat chat={chat}></AddUserToChat>
                <span onClick={() => removeUserFromChat({ variables: { userId: myId, chatId: chat.id } })}> Leave</span>
            </>
            : <span>Delete chat</span>}
    </StyledChatOptions>)
}

interface StyledChatOptionsProps {
    isGroup: boolean
}

const StyledChatOptions = styled.div<StyledChatOptionsProps>`
cursor: auto;
flex: 1 0 100%;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-evenly;
min-height: 2rem;
background: ${({ theme, isGroup }) => isGroup ? theme.colors.primary5 : theme.colors.primary2};
border-radius: 0 0 15px 15px;
margin-top: 0.5rem;

span{
    cursor: pointer;
    color: ${({ theme, isGroup }) => isGroup ? theme.colors.primary1 : theme.colors.primary6};
}
`;