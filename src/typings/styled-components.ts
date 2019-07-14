import "styled-components";
import { Theme } from "../theme";

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
