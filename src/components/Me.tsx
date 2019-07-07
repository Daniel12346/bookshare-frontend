import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useMe } from "./hooks/me";

export default () => {
  //TODO: fix

  /*
  The default error policy treats all errors like network errors, but graphql responses can contain both errors and data.
  This query would cause an error while the user is not authenticated and the cache would not be updated without errorPolicy: "all".
  */
  const { loading, me, isLoggedIn, error } = useMe();

  if (error) {
    return <span>{error.message}</span>;
  }
  if (loading) {
    return <span>Loading...</span>;
  }
  return (
    <>
      <div>
        {me && (
          <div>
            <span>{me.firstName}</span>
            <span>{me.lastName}</span>
            <span>{me.id}</span>
          </div>
        )}
        <div> {isLoggedIn ? <Logout /> : <Login />}</div>
      </div>
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
