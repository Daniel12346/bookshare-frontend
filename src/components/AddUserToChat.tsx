import React, { useState } from "react";
import { useUsersQuery, useAddUserToChatMutation, Chat } from "graphql/types";
import styled from "styled-components";


interface Props {
    chat: Chat
}

interface StyledAddUserContainerProps {
    isListShown: boolean;
}

export default ({ chat }: Props) => {
    const [isListShown, setIsListShown] = useState(false);
    const { data } = useUsersQuery();
    const [addUserToChat] = useAddUserToChatMutation();
    //includes the users that are not already in the chat 
    const usersThatCanBeAdded = data?.users.filter(user => chat.users.findIndex(userInChat => userInChat?.id === user?.id) === -1).sort();
    return <StyledAddUserContainer isListShown={isListShown}>
        <span onClick={() => setIsListShown(prev => !prev)}>+ Add user</span>
        <ul>{usersThatCanBeAdded?.map(user => <li onClick={() => addUserToChat({ variables: { chatId: chat.id, userId: user?.id } })}>
            {user?.firstName}
        </li>)}
            {usersThatCanBeAdded?.length === 0 && <li>No users to add.</li>}
        </ul>
    </StyledAddUserContainer>;
};

const StyledAddUserContainer = styled.div<StyledAddUserContainerProps> `
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

`;
