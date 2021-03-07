import styled, { css } from "styled-components";

export default styled.nav`
  display: flex;
  min-height: 4vh;
  justify-content: space-evenly;
  align-items: center;

  ${({ theme }) =>
    theme &&
    css`
      background: ${theme.colors.primary3};
      a {
        color: ${theme.colors.text1};
      }
    `}
`;
