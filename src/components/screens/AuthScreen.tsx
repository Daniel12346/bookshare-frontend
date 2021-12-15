import Auth from "components/Auth";
import { StyledH1 } from "components/StyledH1";
import React, { useState } from "react";
import styled from "styled-components";

type Mode = "logIn" | "signUp"

export default () => {
    // const [isRegistered, setIsRegistered] = useState(true);
    const [mode, setMode] = useState<Mode>("logIn")

    return (
        <>
            <StyledH1Container>
                <StyledH1>BookShare</StyledH1>
            </StyledH1Container>
            <StyledAuthContainer>
                <Auth mode={mode} setMode={setMode}></Auth>
                <StyledBooksImg src="books.jpg"></StyledBooksImg>

            </StyledAuthContainer>
        </>)
}

const StyledAuthContainer = styled.div`
    margin-top: 10vh;
    display: flex;
    min-height: 50vh;
    background: "white";

    flex-flow: row wrap;
    justify-content: center;
    gap: 2rem;
    span{
        display: flex;
        background: ${({ theme }) => theme.colors.primary2};
        padding: 1rem;
    }
    >*{
        max-height: 20rem;
        flex-basis: 50%;
        max-width: 20rem;
        min-width:  10rem;

    }
`

const StyledBooksImg = styled.img`
    width: auto;
`

const StyledH1Container = styled.div`
    text-align: center;
    width:100vw;
    max-width: 40rem;
`