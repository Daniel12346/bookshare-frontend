import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,*::before,*::after{
    box-sizing: border-box;
    padding:0;
    margin: 0;
    border: none;
    /*TODO: font*/
    font-family: sans-serif;
    overflow-x: hidden
}
body{
    background: ${({ theme }) => theme.colors.background1}
}
`;
