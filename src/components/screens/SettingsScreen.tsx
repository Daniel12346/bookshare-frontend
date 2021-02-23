import { useQuery } from "@apollo/client";
import { useMe } from "components/hooks/me";
import Logout from "components/Logout";
import React from "react";
export default () => {
    const { me } = useMe();
    return (
        <div>
            <span>{`${me?.firstName}  ${me?.lastName}`}</span>
            <Logout></Logout>
        </div>)
}