import React from "react";
import styled from "styled-components";
import { useMe } from "./hooks/me";

export default () => {
  //TODO: fix

  /*
  The default error policy treats all errors like network errors, but graphql responses can contain both errors and data.
  This query would cause an error while the user is not authenticated and the cache would not be updated without errorPolicy: "all".
  */
  const { loading, me, error } = useMe();

  if (error) {
    return <span>{error.message}</span>;
  }
  if (loading) {
    return <span>Loading...</span>;
  }
  return (
    <>
      {me && (
        <div>
          <StyledUserImage src={me.profileImageUrl || ""}></StyledUserImage>
          <div>
            <span>{me.firstName}</span>
            <span>{me.lastName}</span>
            <span>{me.id}</span>
          </div>
        </div>
      )}
    </>
  );
  /*
  <><div>
        {error && <span>error.message</span>}
        {loading && <span>Loading...</span>}
        {data && me && (
          <div>
            <span>{me.firstName}</span>
            <span>{me.lastName}</span>
            <span>{me.id}</span>
          </div>
        )}
        <div>
        {!!localStorage.getItem("token") ? <Logout /> : <Login>}
          <div>
      </div></>)*/
};

// interface StyledChatImageProps {
//   large?: boolean;
// }

const StyledUserImage = styled.img`
  max-width: 10rem;
  height: 10rem;
  display: block;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  border: 5px white solid;
`;