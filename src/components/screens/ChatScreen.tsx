//import { useChatsQuery } from "graphql/types";
import React, { useEffect } from "react";
import { RouteProps } from "types";

interface Props {
  chatId?: string;
}

export default (props: RouteProps<Props>) => {
  //const { data, loading, error } = useChatsQuery();
  const { chatId } = props;
  console.log(props);
  useEffect(() => {
    console.log(chatId);
  });
  return <span>CHATID: {chatId}</span>;
};
