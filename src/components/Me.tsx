import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useMeQuery } from "graphql/types";

export default () => {
  //TODO: fix
  const isAuth = !!localStorage.getItem("token");

  /*
  The default error policy treats all errors like network errors, but graphql responses can contain both errors and data.
  This query would cause an error while the user is not authenticated and the cache would not be updated without errorPolicy: "all".
  */
  const { data, loading, error } = useMeQuery({ errorPolicy: "all" });
  return (
    <>
      <div>
        {error && !data && <span>{error.message}</span>}
        {loading && <span>Loading...</span>}

        {data && data.me && (
          <div>
            <span>{data.me.firstName}</span>
            <span>{data.me.lastName}</span>
            <span>{data.me.id}</span>
          </div>
        )}
        <div> {isAuth ? <Logout /> : <Login />}</div>
      </div>
    </>
  );
  /*
  <><div>
        {error && <span>error.message</span>}
        {loading && <span>Loading...</span>}
        {data && data.me && (
          <div>
            <span>{data.me.firstName}</span>
            <span>{data.me.lastName}</span>
            <span>{data.me.id}</span>
          </div>
        )}
        <div>
        {!!localStorage.getItem("token") ? <Logout /> : <Login>}
          <div>
      </div></>)*/
};
