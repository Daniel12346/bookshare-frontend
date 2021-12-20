import React from "react"
import { Book as TBook, useAddBookToOwnedMutation, useBooksQuery } from "graphql/types"
import Loader from "./Loader";
import styled from "styled-components";
import { useMe } from "./hooks/me";

interface Props {
    books: TBook[]
}

export default ({ books }: Props) => {

    return (
        <StyledBookList>
            {books && books.length > 0 ? books.map(book => book && <Book key={book.id} book={book as TBook}></Book>) : <span>No books here yet</span>}
        </StyledBookList>
    )
}

interface BookProps {
    book: TBook
}



const Book = ({ book: { id, name, author, year, coverUrl } }: BookProps) => {
    const { id: myId } = useMe();
    const [addBookToOwned, { error }] = useAddBookToOwnedMutation();
    error && console.log(error);
    return (
        <StyledListItem onClick={() => addBookToOwned({ variables: { userId: myId, bookId: id } })}>
            <img src={coverUrl} alt=""></img>
            <StyledBookInfo>
                <span className="name">{name}</span>
                <span className="author">{author}</span>
                {/* TODO: change year to publisher */}
                <span className="year">{year}</span>
            </StyledBookInfo>
            <span id="delete-button">x</span>
        </StyledListItem>)
}

const StyledBookList = styled.ul`   
    width: 40vw;
    min-width: 300px;
    padding: 1rem;
    display: flex;
    /* TODO: alternate row wrap */
    flex-flow: column nowrap;
    background: ${({ theme }) => theme.colors.primary1};
    >*{min-height: 6rem}
`

const StyledBookInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
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
