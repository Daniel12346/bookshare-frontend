import React from "react";
import client from "apolloClient";

//TODO: auth service
export default () => {
  const handleLogOut = (): void => {
    localStorage.removeItem("token");
    client.resetStore();
  };
  return (
    <>
      <button onClick={handleLogOut}>logOut</button>
    </>
  );
};
