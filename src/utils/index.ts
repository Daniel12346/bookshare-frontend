import { Message } from "graphql/types";

//a function used for sorting messages by date
export const byDateDesc = (
  a: Pick<Message, "createdAt"> | null,
  b: Pick<Message, "createdAt"> | null
): number =>
  a && b
    ? //valueOf() return a number which is necessary because typescript does not allow directly comparing dates
      new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    : 1;
