import { Message } from "graphql/types";

//a function that is passed as a parameter to the array sort() method
export const byDateDesc = (
  a: Pick<Message, "createdAt"> | null,
  b: Pick<Message, "createdAt"> | null
): number =>
  a && b
    ? //valueOf() return a number which is necessary because typescript does not allow directly comparing dates
      new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    : 1;
