import Login from "components/Login";
import SignUp from "components/SignUp";
import React, { useState } from "react";

export default () => {
    const [isRegistered, setIsRegistered] = useState(true);
    return (<div >{
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
    </div >)
}