import Login from "components/Login";
import SignUp from "components/SignUp";
import React, { useState } from "react";
import styled from "styled-components";

export default () => {
    const [isRegistered, setIsRegistered] = useState(true);
    return (<StyledAuthContainer >{
        isRegistered ?
            <div>
                <Login />
                <span onClick={() => setIsRegistered(prev => !prev)}>Don't have an account yet? Sign up</span>
            </div>
            :
            <div>
                <SignUp />
                <span onClick={() => setIsRegistered(prev => !prev)}>Already have an account? Log in</span>
            </div>
    }
    </StyledAuthContainer>)
}

const StyledAuthContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-flow: row wrap;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary1};
    span{
        display: flex;
        background: ${({ theme }) => theme.colors.primary2};
        padding: 1rem;
    }
`