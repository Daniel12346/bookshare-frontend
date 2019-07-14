import React from "react";
import { useUsersQuery } from "graphql/types";

export default () => {
  const { data, loading, error } = useUsersQuery();
  return (
    <>
      {loading && <span>Loading...</span>}
      {error && error.message}
      <ul>
        {data &&
          data.users &&
          data.users.map(
            user =>
              user && (
                <li key={user.id}>{user.firstName + " " + user.lastName}</li>
              )
          )}
      </ul>
    </>
  );
};
