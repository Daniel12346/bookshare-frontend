import React, { useState } from "react";
import styled from "styled-components";
import { useAddUserToChatMutation, useCreateChatMutation, useMeQuery, useUsersQuery } from "graphql/types";
import { ME_QUERY } from "graphql/queries";
import StyledImage from "./StyledImage";
import StyledCard from "./StyledCard";
import StyledDropdown from "./StyledDropdown";
import Loader from "./Loader";

export default () => {
  const { data: meData } = useMeQuery();
  const { data, loading } = useUsersQuery();
  const [createChat, { error: mutationError }] = useCreateChatMutation({ refetchQueries: [{ query: ME_QUERY }], onCompleted: (data) => { console.log("completed", data) } });
  return (
    <StyledContainer>
      {loading && <Loader />}
      {//error && error.message
      }
      {mutationError && mutationError.message}
      <StyledUserList>
        {data?.users?.filter(user => user?.id !== meData?.me?.id).map(
          (user) =>
            user && (
              <StyledCard key={user.id}>
                <StyledUserInfo>
                  <StyledImage src={user.profileImageUrl || ""}></StyledImage>
                  <span>{user.firstName + " " + user.lastName}</span>
                </StyledUserInfo>
                {/* <StyledUserOptions>
                  <span onClick={() => createChat({ variables: { userId: user.id } })}>Create chat</span>
                  <AddToGroup userId={user.id}></AddToGroup>
                </StyledUserOptions> */}
              </StyledCard>
            )
        )}
      </StyledUserList>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
const StyledUserList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  >*{margin-bottom: 0.5rem}
`
const StyledUserInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  img{
    margin: 0.5rem 2rem 0.5rem 1rem;
  }
`

const StyledUserOptions = styled.div`
cursor: auto;
flex: 1 0 100%;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: space-evenly;
min-height: 2rem;
border-radius: 0 0 15px 15px;
margin-top: 0.5rem;
background: hsla(0,0%, 96%,1);

span{
    cursor: pointer;
}
`;
interface Props {
  userId: string
}
// const AddToGroup = ({ userId }: Props) => {
//   const [isListShown, setIsListShown] = useState(false);
//   const { data } = useMeQuery();
//   const [addUserToChat] = useAddUserToChatMutation();
//   const chats = data?.me?.chats;

//   const groupsWhereUserCanBeAdded = chats?.filter(chat => chat?.isGroup && chat.users.findIndex(user => user?.id === userId) === -1);
//   return <StyledDropdown isListShown={isListShown}>
//     <span onClick={() => setIsListShown(prev => !prev)}>Add to group</span>
//     <ul>{groupsWhereUserCanBeAdded?.map(chat => <li key={chat?.id} onClick={() => addUserToChat({ variables: { chatId: chat?.id, userId: userId } })}>
//       {chat?.name || chat?.id}
//     </li>)}
//       {groupsWhereUserCanBeAdded?.length === 0 && <li>No groups where user could be added found.</li>}
//     </ul>
//   </StyledDropdown>;
// };

