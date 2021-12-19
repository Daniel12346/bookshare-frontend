import styled from "styled-components";

interface StyledButtonProps {
    isCurrentMode?: boolean
}

export const StyledButton = styled.button<StyledButtonProps> `
text-align: center;
cursor: pointer;
padding: 0.3rem;
background: ${({ theme }) => theme.colors.primary2};
background: ${({ isCurrentMode, theme }) => isCurrentMode ? theme.colors.primary4 : theme.colors.primary2};
max-width: 10rem;
min-width: 2rem;
`;
