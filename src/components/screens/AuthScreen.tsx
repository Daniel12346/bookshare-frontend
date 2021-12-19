import Auth from "components/Auth";
import { StyledH1 } from "components/StyledH1";
import React, { useState } from "react";
import styled from "styled-components";

type Mode = "logIn" | "signUp"

export default () => {
    // const [isRegistered, setIsRegistered] = useState(true);
    const [mode, setMode] = useState<Mode>("logIn")

    return (
        <StyledAuthScreenContainer>
            <StyledH1Container>
                <StyledH1>BookShare</StyledH1>
            </StyledH1Container>
            <StyledAuthContainer>
                <Auth mode={mode} setMode={setMode}></Auth>
                <StyledBooksImg src="books.jpg"></StyledBooksImg>

            </StyledAuthContainer>
        </StyledAuthScreenContainer>)
}

const StyledAuthContainer = styled.div`
    margin-top: 8vh;
    display: flex;
    min-height: 50vh;
    width: 50vw;
    flex-flow: row wrap;
    gap: 2rem;
    justify-content: space-between;
    span{
        display: flex;
        background: ${({ theme }) => theme.colors.primary2};
        padding: 1rem;
    }
    >*{
        max-height: 20rem;
        flex: 1 0 45%;
        max-width: 20rem;
        min-width:  5rem;
    }
`

const StyledBooksImg = styled.img`
    width: auto;
    object-fit: cover;
    object-position: center;
`

const StyledH1Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    @media screen and (max-width: 600px){
        justify-content: center;
    }
`

const StyledAuthScreenContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-self: center;
    padding-top: 7vmin;
    >*{
        width: 100%;
        min-width: 300px;
        max-width: 55vmax;
    }
`