import styled, { css } from "styled-components";

export default styled.nav`
  display: flex;
  min-height: 8vh;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;

  ${({ theme }) =>
    theme &&
    css`
      background: ${theme.colors.primary5};
      * {
        color: ${theme.colors.text1};
      }
    `}
`;
