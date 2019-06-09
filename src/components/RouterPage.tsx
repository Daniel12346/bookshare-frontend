import { RouteComponentProps } from "@reach/router";

export default (props: RouteComponentProps & { component: JSX.Element }) =>
  props.component;
