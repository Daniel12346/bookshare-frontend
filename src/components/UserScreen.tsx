import { useParams } from "@reach/router";
import { Book, useUserQuery } from "graphql/types";
import React from "react"
import styled from "styled-components";
import BookList from "./BookList";
import { useMe } from "./hooks/me";
import ImageUploader from "./ImageUploader";
import Loader from "./Loader";
import { Column, Row } from "./styled/utils";
import StyledImage from "./StyledImage";
import StyledUserInfo from "./StyledUserInfo";
export default () => {
    //ionako ce me.id trebat za dijeljenje knjiga
    const { me } = useMe();
    const params = useParams();
    if (!params) return null;
    const id = params?.userId;
    const { data, loading, error } = useUserQuery({ variables: { id } })
    const user = data?.user;
    const isMe = me && me.id === user?.id;
    return (<StyledScreenContainer>
        {loading && <Loader></Loader>}
        {error && <span>Something went wrong...</span>}
        {user && (<>
            <Row id="userInfoContainer">
                <StyledUserInfo>
                    <StyledImage src={user.profileImageUrl ?? ""}></StyledImage>
                    {isMe && <ImageUploader></ImageUploader>}
                    <Column id="userInfo">
                        <Row>
                            <StyledUserName>{`${user.firstName} ${user.lastName}`}</StyledUserName>
                        </Row>
                        <StyledUserInfoTable>
                            <Column>
                                <span className="infoName">Joined at</span>
                                <span className="infoValue">(date)</span>
                            </Column>
                            <div className="separator"></div>
                            <Column>
                                <span className="infoName">Books shared</span>
                                <span className="infoValue">(num)</span>
                            </Column>
                            <div className="separator"></div>
                            <Column>
                                <span className="infoName">Books received</span>
                                <span className="infoValue">(num)</span>
                            </Column>
                        </StyledUserInfoTable>
                    </Column>
                </StyledUserInfo>
            </Row>
            <Row className="bookListRow">
                {<BookList heading={`${user.firstName}'s books`} books={user.owned as Book[]}></BookList>}
            </Row>
            <Row className="bookListRow">
                {<BookList heading={`${user.firstName}'s wishlist`} books={user.wanted as Book[]}></BookList>}
            </Row>
        </>)
        }

    </StyledScreenContainer >)
}

const StyledScreenContainer = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    gap: 5vh;
    >${Row}{
        width: 90%;
        max-width: 45rem;
        min-width: 300px;
    }
    #userInfoContainer{
        max-width: 40rem;
    }
    ${StyledUserInfo}{
        padding: 1rem;
        justify-content: space-evenly;
        width: 100%;
        margin: 5vh 0 3vh;

       >img{
        height: 7rem;
        width: 7rem;
        /* border: ${({ theme }) => `6px solid ${theme.colors.primary1}`}; */  
        }
    }
    .bookListRow{
        max-height: 40vh;
    }
    
`

const StyledUserInfoTable = styled.div`
    background: ${({ theme }) => theme.colors.primary1};
    display: flex;
    flex-flow: row nowrap;
    padding: 0.5rem;
    .separator{
        height: 100%;
        margin: 0 1rem;
        border: ${({ theme }) => `1px solid ${theme.colors.primary2}`};
    }
    height: 6rem;
    ${Column}{
        justify-content: space-evenly;
        .infoName{
            text-align: center;
            font-size: 0.8rem;
            color: ${({ theme }) => theme.colors.primary3};
        }
        .infoValue{
            text-align: center;
            font-size: 1.2rem;
            color: ${({ theme }) => theme.colors.primary4};
        }       
    }
`
const StyledUserName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary4};
`