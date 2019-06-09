import styled, { css } from "styled-components";

export default styled.nav`
  display: flex;
  min-height: 4vh;
  justify-content: space-between;
  align-items: center;

  ${props =>
    props.theme &&
    css`
      background: ${props.theme.primary1};
      a {
        color: ${props.theme.text1};
      }
    `}
`;
