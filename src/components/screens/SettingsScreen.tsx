import { useMe } from "components/hooks/me";
import Logout from "components/Logout";
import { ME_QUERY } from "graphql/queries";
import { useUploadImageMutation } from "graphql/types";
import React, { FormEvent } from "react";
export default () => {
    const [uploadImage, { error }] = useUploadImageMutation({ refetchQueries: [{ query: ME_QUERY }] });
    const { me } = useMe();
    return (
        <div>
            <span>{`${me?.firstName}  ${me?.lastName}`}</span>
            <Logout></Logout>
            {error && error.message}
            <input type="file" onChange={({ target: { validity, files: [file] } }: any) => {
                if (validity.valid) {
                    console.log(file);
                    uploadImage({ variables: { file } });
                }
            }}></input>
            {me?.profileImageUrl && <img width="100px" src={me.profileImageUrl}></img>}
        </div>)
}