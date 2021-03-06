import React from "react"
import { Book as TBook, useAddBookToOwnedMutation, useBooksQuery } from "graphql/types"
import Loader from "./Loader";
import styled from "styled-components";
import { useMe } from "./hooks/me";
import { navigate } from "@reach/router";

interface Props {
    books: TBook[]
    heading?: string
    //TODO: onRemove umisto ovega
    hasDeleteButtons?: boolean,
    booksAreLinks?: boolean
}

export default ({ books, heading, hasDeleteButtons, booksAreLinks }: Props) => {

    return (
        <StyledBookList>
            {heading && <StyledHeading>{heading}</StyledHeading>}
            {books && books.length > 0 ? books.map(book => book && <Book key={book.id} book={book as TBook}
                hasDeleteButtons={hasDeleteButtons}
                booksAreLinks={booksAreLinks}
            ></Book>)
                : <span id="noBooks">No books here yet</span>}
        </StyledBookList>
    )
}

interface BookProps {
    book: TBook,
    hasDeleteButtons?: boolean,
    booksAreLinks?: boolean;
    //TODO:
    handleClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined
}



const Book = ({ book: { id, name, author, year, coverUrl }, hasDeleteButtons, booksAreLinks }: BookProps) => {
    // const { id: myId } = useMe();
    // const [addBookToOwned, { error }] = useAddBookToOwnedMutation();
    // error && console.log(error);
    return (
        <StyledListItem onClick={() => {
            navigate(`/book/${id}`)
        }}>
            <img src={coverUrl} alt=""></img>
            <StyledBookInfo>
                <span className="name">{name}</span>
                <span className="author">{author}</span>
                {/* TODO: change year to publisher */}
                <span className="year">{year}</span>
            </StyledBookInfo>
            {hasDeleteButtons && <span id="delete-button">x</span>}
        </StyledListItem>)
}

const StyledBookList = styled.ul`   
    width: 100%;
    min-width: 300px;
    padding: 1rem;
    display: flex;
    /* TODO: alternate row wrap */
    flex-flow: column nowrap;
    align-content: space-between;
    background: ${({ theme }) => theme.colors.primary1};
    >*{min-height: 6rem}
    #noBooks{
        align-self: center;
    }
`
const StyledHeading = styled.h2`
        align-self: center;
        color: ${({ theme }) => theme.colors.primary5};
        font-size: 1rem;
`

const StyledBookInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    span:not(:last-child){
        margin-bottom: 0.5rem;
    }
`

const StyledListItem = styled.li`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    img {
        height: 100%;
        width: auto;
        max-width: 6rem;
        max-height: 7rem;
        object-fit: contain;
        object-position: center;
    }
    margin-bottom: 2rem;
    gap: 10%;
    >*{
        flex: 1;
    }
    #delete-button{
        max-width: 5%;
    }
`
