import { useParams } from "@reach/router";
import { Book, useUserQuery } from "graphql/types";
import React from "react"
import BookList from "./BookList";
import Loader from "./Loader";
import StyledImage from "./StyledImage";
export default () => {
    const params = useParams();
    if (!params) return null;
    const id = params?.userId;
    const { data, loading, error } = useUserQuery({ variables: { id } })
    const user = data?.user;
    return (<div>
        <span>{id}</span>
        {loading && <Loader></Loader>}
        {error && <span>Something went wrong...</span>}
        {user && <div>
            <StyledImage src={user.profileImageUrl ?? ""}></StyledImage>
            <div>
                <span>{user.firstName}</span>
                <span>{user.lastName}</span>
                <span>{user.id}</span>
                {/* TODO: fix */}
                {<BookList books={user.wanted as Book[]}></BookList>}
            </div>
        </div>}
    </div>)
}

// export default () => {
//     const { me } = useMeQuery();
//     return (
//         <StyledContainer>
//             { me?.profileImageUrl && <StyledImage large alt={""} src={me.profileImageUrl} />}
//             <StyledName>{`${me?.firstName}  ${me?.lastName}`}</StyledName>
//             {error && error.message}
//         </StyledContainer>)
// }

// const StyledContainer = styled.div`
//     margin-top: 4vh;
//     min-height: 60vh;
//     display: flex;
//     flex-flow: column wrap;
//     align-items: center;
//     justify-content: space-evenly;
// `

// const StyledName = styled.span`
//     font-size: 2rem;
//     text-align: center;
// `