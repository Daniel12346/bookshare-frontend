import React from "react";
import { useMe } from "./hooks/me";
export default () => {
  const { logOut } = useMe();
  return (
    <>
      <button onClick={logOut}>logOut</button>
    </>
  );
};
