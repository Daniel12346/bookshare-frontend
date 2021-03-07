import React from "react";
import styled from "styled-components"
import { useMe } from "./hooks/me";
export default () => {
  const { logOut } = useMe();
  return (
    <StyledLogOutButton onClick={logOut}>log out</StyledLogOutButton>
  );
};

const StyledLogOutButton = styled.button`
  cursor: pointer;
  color: red;
  background: white;
  padding: 0.3rem;
  border: 2px red solid;
  border-radius: 5px;
`