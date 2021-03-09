import React, { useState } from "react";
import { useUsersQuery, useAddUserToChatMutation, Chat } from "graphql/types";
import StyledDropdownList from "./StyledDropdown";


interface Props {
    chat: Chat
}

export default ({ chat }: Props) => {
    const [isListShown, setIsListShown] = useState(false);
    const { data } = useUsersQuery();
    const [addUserToChat] = useAddUserToChatMutation();
    //includes the users that are not already in the chat 
    const usersThatCanBeAdded = data?.users.filter(user => chat.users.findIndex(userInChat => userInChat?.id === user?.id) === -1).sort();
    return <StyledDropdownList isListShown={isListShown}>
        <span onClick={() => setIsListShown(prev => !prev)}>+ Add user</span>
        <ul>{usersThatCanBeAdded?.map(user => <li onClick={() => addUserToChat({ variables: { chatId: chat.id, userId: user?.id } })}>
            {user?.firstName}
        </li>)}
            {usersThatCanBeAdded?.length === 0 && <li>No users to add.</li>}
        </ul>
    </StyledDropdownList>;
};


