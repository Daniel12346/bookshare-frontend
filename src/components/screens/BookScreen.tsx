import { navigate, useParams } from "@reach/router";
import { useMe } from "components/hooks/me"
import Loader from "components/Loader";
import { Row } from "components/styled/utils";
import StyledCard from "components/StyledCard";
import StyledImage from "components/StyledImage";
import StyledUserInfo from "components/StyledUserInfo";
import UserList from "components/UserList";
import { ME_QUERY } from "graphql/queries";
import { useAddBookToOwnedMutation, useAddBookToWantedMutation, useBookQuery, useMeQuery, User, useUsersQuery } from "graphql/types";
import React from "react"
import styled from "styled-components";

export default () => {
    const { me } = useMe();
    const params = useParams();
    if (!params) return null;
    const id = params?.bookId;
    const { data, loading, error } = useBookQuery({ variables: { id } })
    const book = data?.book;
    const [addBookToOwned] = useAddBookToOwnedMutation()
    const [addBookToWanted] = useAddBookToWantedMutation()
    const handleAddToMyBooks = () => {
        if (!id) return;
        addBookToOwned({ variables: { userId: me?.id, bookId: id }, refetchQueries: [{ query: ME_QUERY }] });
    }

    const handleAddToWishlist = () => {
        if (!id) return;
        addBookToWanted({ variables: { userId: me?.id, bookId: id }, refetchQueries: [{ query: ME_QUERY }] });
    }

    return <StyledScreenContainer>
        {book &&
            (<>
                <StyledBookImageAndInfo>
                    <img src={book.coverUrl} alt={`the cover of ${book.name}`}></img>
                    <div>
                        <span>{`Title: ${book.name}`}</span>
                        <span>{`Author: ${book.author}`}</span>
                        <span>{`Year published: ${book.year}`}</span>
                    </div>
                </StyledBookImageAndInfo>
                <Row id="addLinks">
                    <span onClick={handleAddToMyBooks}>Add to my books</span>
                    <span onClick={handleAddToWishlist}>Add to wishlist</span>
                </Row>
                <StyledSpan>Users who own this book</StyledSpan>
                <BookOwnerList users={book.ownedBy as User[]}></BookOwnerList>
            </>)
        }
    </StyledScreenContainer>
}



const StyledScreenContainer = styled.div`
    padding-top: 5vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    min-height: 100vh;
    overflow: unset;
    #addLinks{
        justify-content: space-evenly;
        width: 80%;
        gap: 1rem;
        cursor: pointer;
    }
`
const StyledBookImageAndInfo = styled.div`
    overflow: unset;
    display: flex;
    margin-bottom: 8vh;
    width: 80%;
    min-width: 300px;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 2rem;
    min-height: 30vh;
    height: auto;
    >*{
        flex: 0 0 40%;
        min-width: 200px;
        @media screen and (max-width: 800px){
            flex: 1 0 50%;
        }
    }
    @media screen and (max-width: 800px){
        justify-content: center;
    }
    img{
        max-width: 60vw;
        object-fit: contain;
        object-position: center;
        max-height: 60vh;

    }
    >div{
        min-height: 5rem;
        background: ${({ theme }) => theme.colors.primary1};
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        padding: 0 2%;
        >span{
            width: 100%;
            border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary3}`}
        }
    }
`

interface BookOwnerListProps {
    users: User[]
}

const BookOwnerList = ({ users }: BookOwnerListProps) => {
    const { data: meData } = useMeQuery();
    return (
        <StyledContainer>
            <StyledUserList>
                {users.length === 0 ? <span>No users own this book</span> : users.filter(user => user?.id !== meData?.me?.id).map(
                    (user) =>
                        user && (
                            <StyledCard key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                                <StyledUserInfo>
                                    <StyledImage src={user.profileImageUrl || ""}></StyledImage>
                                    <span>{user.firstName + " " + user.lastName}</span>
                                </StyledUserInfo>
                                {/* <StyledUserOptions>
                    <span onClick={() => createChat({ variables: { userId: user.id } })}>Create chat</span>
                    <AddToGroup userId={user.id}></AddToGroup>
                  </StyledUserOptions> */}
                            </StyledCard>
                        )
                )}
            </StyledUserList>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
  `
const StyledUserList = styled.ul`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
  
    >*{
        background: ${({ theme }) => theme.colors.primary1};
        margin-bottom: 0.5rem}  
  `
const StyledSpan = styled.span`
        margin-top: 3rem;
        color: ${({ theme }) => theme.colors.primary2};
        font-weight: 700;


`