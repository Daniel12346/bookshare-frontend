import styled from "styled-components";

interface StyledDropdownListProps {
    isListShown: boolean;
}

export default styled.div<StyledDropdownListProps> `
    ul{
        display: ${({ isListShown }) => isListShown ? "flex" : "none"};
        position: absolute;
        background: white;
        flex-flow: column nowrap;
        box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.29);
        border-radius: 5px;
        
        li{
            min-height: 3rem;
            padding: 0.2rem;
        }
    }

`;
