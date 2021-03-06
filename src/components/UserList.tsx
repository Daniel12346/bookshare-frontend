import React from "react";
import { useCreateChatMutation, useMeQuery, useUsersQuery } from "graphql/types";
import { ME_QUERY } from "graphql/queries";

export default () => {
  const { data: meData } = useMeQuery();
  const { data, loading } = useUsersQuery();
  const [createChat, { error: mutationError }] = useCreateChatMutation({ refetchQueries: [{ query: ME_QUERY }], onCompleted: (data) => { console.log("completed", data) } });
  return (
    <>
      {loading && <span>Loading...</span>}
      {//error && error.message
      }
      {mutationError && mutationError.message}
      <ul>
        {data?.users?.filter(user => user?.id !== meData?.me?.id).map(
          (user) =>
            user && (
              <li key={user.id}>
                <div>
                  <span>{user.firstName + " " + user.lastName}</span>
                  <button onClick={() => createChat({ variables: { userId: user.id } })}>chat</button>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
};
