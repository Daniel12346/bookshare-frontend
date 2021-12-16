import React from "react";
import styled from "styled-components";
import { useMeQuery, useUsersQuery } from "graphql/types";
import StyledImage from "./StyledImage";
import StyledCard from "./StyledCard";
import Loader from "./Loader";
import StyledUserInfo from "./StyledUserInfo";

export default () => {
  const { data: meData } = useMeQuery();
  const { data, loading } = useUsersQuery();
  return (
    <StyledContainer>
      {loading && <Loader />}
      {//error && error.message
      }
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


// const StyledUserOptions = styled.div`
// cursor: auto;
// flex: 1 0 100%;
// display: flex;
// flex-flow: row nowrap;
// align-items: center;
// justify-content: space-evenly;
// min-height: 2rem;
// border-radius: 0 0 15px 15px;
// margin-top: 0.5rem;
// background: hsla(0,0%, 96%,1);

// span{
//     cursor: pointer;
// }
// `;
interface Props {
  userId: string
}

