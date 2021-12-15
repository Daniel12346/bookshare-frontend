import styled from "styled-components";

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.primary4};
  font-size: 3rem;
  @media screen and (max-width:600px){
      font-size: 2.5rem;
  }
`;
