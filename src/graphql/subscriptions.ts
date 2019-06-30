import gql from "graphql-tag";
import { MessageDetails } from "./fragments";

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription messageCreated {
    messageCreated {
      ...MessageDetails
    }
  }
  ${MessageDetails}
`;
