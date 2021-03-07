import { useMe } from "components/hooks/me";
import styled from "styled-components"
import Logout from "components/Logout";
import { ME_QUERY } from "graphql/queries";
import { useUploadImageMutation } from "graphql/types";
import React from "react";
import StyledImage from "components/StyledImage";
export default () => {
    const [uploadImage, { error }] = useUploadImageMutation({ refetchQueries: [{ query: ME_QUERY }] });
    const { me } = useMe();
    return (
        <StyledContainer>
            { me?.profileImageUrl && <StyledImage large alt={""} src={me.profileImageUrl} />}
            <StyledName>{`${me?.firstName}  ${me?.lastName}`}</StyledName>
            <Logout></Logout>
            {error && error.message}
            <input type="file" onChange={({ target: { validity, files: [file] } }: any) => {
                if (validity.valid) {
                    console.log(file);
                    uploadImage({ variables: { file } });
                }
            }}></input>
        </StyledContainer>)
}

const StyledContainer = styled.div`
    margin-top: 4vh;
    min-height: 60vh;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-evenly;
`

const StyledName = styled.span`
    font-size: 2rem;
    text-align: center;
`