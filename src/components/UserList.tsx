import React from "react";
import styled from "styled-components";
import { useMeQuery, useUsersQuery } from "graphql/types";
import StyledImage from "./StyledImage";
import StyledCard from "./StyledCard";
import Loader from "./Loader";
import StyledUserInfo from "./StyledUserInfo";
import { navigate } from "@reach/router";

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
              <StyledCard key={user.id} onClick={() => navigate(`user/${user.id}`)}>
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

  >*{
    background: ${({ theme }) => theme.colors.background}}
    margin-bottom: 0.5rem;


`


