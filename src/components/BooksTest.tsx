import React from "react"
import { Book as TBook, useAddBookToOwnedMutation, useAddBookToWantedMutation, useBooksQuery } from "graphql/types"
import Loader from "./Loader";
import styled from "styled-components";
import { useMe } from "./hooks/me";
export default () => {
    const { data, loading, error } = useBooksQuery()
    error && console.log(error);
    const books = data?.books;
    return (
        <>
            {loading && <Loader></Loader>}
            <StyledBookList>
                {books && books.map(book => book && <Book key={book.id} book={book as TBook}></Book>)}
            </StyledBookList>
        </>
    )
}

interface BookProps {
    book: TBook
}



const Book = ({ book: { id, name, author, year, coverUrl } }: BookProps) => {
    const { id: myId } = useMe();
    const [addBookToOwned, { error }] = useAddBookToOwnedMutation();
    error && console.log(error);
    return <li onClick={() => addBookToOwned({ variables: { userId: myId, bookId: id } })}>
        <img width="20px" src={coverUrl} alt=""></img>
        <span>{name}</span>
        <span>{author}</span>
        <span>{year}</span>
    </li>
}

const StyledBookList = styled.ul`   
    display: flex;
    /* TODO: alternate row wrap */
    flex-flow: column nowrap;
`