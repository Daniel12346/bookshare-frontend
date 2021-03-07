import React from "react"
import { Chat } from "graphql/types";
import styled from "styled-components"
import AddUserToChat from "./AddUserToChat";


interface Props {
    chat: Chat
}

export default ({ chat }: Props) => {
    return (<StyledChatOptions isGroup={chat.isGroup}>
        {chat.isGroup ?
            <>
                <AddUserToChat chat={chat}></AddUserToChat>
                <span> Leave</span>
            </>
            : <span>User options</span>}
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