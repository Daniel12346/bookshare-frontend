import React, { useState } from "react"
import { Chat, useUsersQuery, useAddUserToChatMutation } from "graphql/types";
import styled from "styled-components"

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

const AddUserToChat = ({ chat }: Props) => {
    const [isListShown, setIsListShown] = useState(false);
    const { data } = useUsersQuery();
    const [addUserToChat] = useAddUserToChatMutation();
    //includes the users that are not already in the chat 
    const usersThatCanBeAdded = data?.users.filter(user => chat.users.findIndex(userInChat => userInChat?.id === user?.id) === -1).sort();
    return <StyledAddUserContainer isListShown={isListShown}>
        <span onClick={() => setIsListShown(prev => !prev)}>+ Add user</span>
        <ul>{usersThatCanBeAdded?.map(user =>
            <li onClick={() => addUserToChat({ variables: { chatId: chat.id, userId: user?.id } })}>
                {user?.firstName}
            </li>)}
        </ul>
    </StyledAddUserContainer>
}

interface StyledAddUserContainerProps {
    isListShown: boolean;
}
const StyledAddUserContainer = styled.div<StyledAddUserContainerProps>`
    ul{
        display: ${({ isListShown }) => isListShown ? "flex" : "none"};
        position: absolute;
        background: white;
        flex-flow: column nowrap;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.29);
        border-radius: 5px;
        
        li{
            min-height: 3rem;
            padding: 0.2rem;
        }
    }

`

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
background: ${({ theme, isGroup }) => isGroup ? theme.colors.primary4 : theme.colors.primary2};
border-radius: 0 0 15px 15px;
margin-top: 0.5rem;
`;