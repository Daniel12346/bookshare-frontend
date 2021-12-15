import React from "react";
// import Chat from "./Chat";

// //the interface is imported as IChat to name clashes with the Chat component
// import { useMeQuery } from "graphql/types";
// import styled from "styled-components";
// import Loader from "./Loader";

// export default () => {
//   const { data, loading, error } = useMeQuery();

//   return (
//     <StyledContainer>
//       {loading && <Loader></Loader>}
//       {error?.message}
//       <StyledChatList>
//         {if(data?.me && data.me.chats){data?.me?.chats.map(
//           (chat) => chat && <Chat key={chat.id} chatId={chat.id} />
// )}
//       </StyledChatList>
//     </StyledContainer>
//   );
// };
// const StyledContainer = styled.div`
//   display: flex;
//   flex-flow: column wrap;
//   align-items: center;
//   padding-top: 5vh;
// `;

// const StyledChatList = styled.ul`
//   display: flex;
//   flex-flow: column wrap;
//   align-items: center;
//   list-style: none;
//   width: 100%;
// `;
