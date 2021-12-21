import apolloClient from "apolloClient";
import BookList from "components/BookList";
import { useMe } from "components/hooks/me"
import Loader from "components/Loader";
import { Column } from "components/styled/utils";
import { StyledButton } from "components/StyledButton";
import { BOOK_QUERY, ME_QUERY } from "graphql/queries";
import { Book, useAddBookToOwnedMutation, useBooksQuery, useMeQuery } from "graphql/types";
import React, { useState } from "react"
import styled from "styled-components";



export default () => {
    const { data, loading, error } = useMeQuery();
    const me = data?.me;
    const myBooks = me?.owned ?? [];
    const { data: dataBooks, loading: loadingAll, error: errorAll } = useBooksQuery();
    const allBooks = dataBooks?.books ?? [];
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [id, setId] = useState("");
    const [addBookToOwned] = useAddBookToOwnedMutation()
    const [filtered, setFiltered] = useState<Book[]>();

    const handleAutoFill = (book: Book) => {
        setTitle(book.name);
        setAuthor(book.author);
        setYear(book.year?.toString() as string);
        setId(book.id);
    }

    const handleAddToMyBooks = (e: React.FormEvent<HTMLFormElement>) => {
        //TODO: createBook umisto return
        if (!id) return;
        e.preventDefault();
        //TODO: optimistic response ili nisto drugo
        //????????
        addBookToOwned({ variables: { userId: me?.id, bookId: id }, refetchQueries: [{ query: ME_QUERY }] });
        setYear("");
        setId("");
        setTitle("");
        setAuthor("");
    }


    return <StyledScreenContainer>
        <StyledContainer>
            {/* //TODO: ! */}
            <StyledForm onSubmit={handleAddToMyBooks} >
                <span>search by title, author, etc.</span>
                {error && <span>{error.message}</span>}
                {loading && <Loader></Loader>}
                <div id="form-inside">
                    Title
                    <label>
                        <input value={title} type="text" onChange={e => {
                            setFiltered(handleSearchBooksByParam({ books: allBooks as Book[], param: "name", value: e.target.value }))
                            setTitle(e.target.value);
                        }} />
                    </label>

                    <label>
                        Author
                        <input value={author} type="text" onChange={e => {
                            setFiltered(handleSearchBooksByParam({ books: allBooks as Book[], param: "author", value: e.target.value }))
                            setAuthor(e.target.value);
                        }} />
                    </label>
                    <label>
                        Year
                        <input value={year} type="text" onChange={e => {
                            setFiltered(handleSearchBooksByParam({ books: allBooks as Book[], param: "year", value: e.target.value }))
                            setYear(e.target.value);
                        }} />
                    </label>

                    <StyledButton id="logIn" type="submit">Add to my books</StyledButton>
                </div>
            </StyledForm >
            <BookList books={myBooks as Book[]}></BookList>
            <BookSuggestionList books={filtered as Book[]} handleAutoFill={handleAutoFill}></BookSuggestionList>
        </StyledContainer>
    </StyledScreenContainer>
}

interface TSearch {
    books: Book[],
    param: "name" | "author" | "year",
    value: string
}
//TODO: search po više parametara istovremeno (npr. title i author)
const handleSearchBooksByParam = ({ books, param, value }: TSearch) => {
    return books.filter(book => !stringIsEmpty(value) && book && book[param]?.toString()?.includes(value))
}

const stringIsEmpty = (s: string) => {
    for (let e of s) {
        if (e !== "" && e !== " ") return false;
    }
    return true;
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  max-width: 30rem;
  min-height: 12rem;
  justify-content: space-between;
  label{
    display: flex;
   flex-flow: column nowrap;
   color: ${({ theme }) => theme.colors.primary4};
  }
  input{
    opacity: 0.6;
    background: none;
    width: 100%;
    margin-bottom: 0.2rem;
    align-self: center;
    min-height: 1.4rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary4};
  }
  button{
    color: white;
  }
  #form-inside{
    background: ${({ theme }) => theme.colors.primary1};
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    min-height: 80%;
    justify-content: space-evenly;
    padding: 1rem;
    #logIn{
      align-self: center;
      background: ${({ theme }) => theme.colors.primary3};
       min-width: 20%;
    }
}
`

const StyledScreenContainer = styled.div`
    margin-top: 10vh;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100vw;

`
interface SuggestionListProps {
    books: Book[],
    handleAutoFill: (book: Book) => void
}

const BookSuggestionList = ({ books, handleAutoFill }: SuggestionListProps) => {
    return <StyledList>
        {books && books.map(book => book && <li key={book.id} onClick={() => handleAutoFill(book)}><Column>
            <span>{book.name}</span>
            <span>{book.author}</span>
            <span>{book.year}</span>
        </Column></li>)}
    </StyledList>
}

const StyledList = styled.ul`
    margin-top: -2rem;
    display: flex;
    flex-flow: column nowrap;
    background: ${({ theme }) => theme.colors.primary1};
    opacity: 0.6;
    gap: 0.4rem;
    overflow-y: scroll;
    max-height: 30vh;
    min-width: 300px;
    width: auto;
    padding: 1rem;
    li {
        min-height: 4rem;
        width: 100%;
        cursor: pointer;
        ${Column}{
            font-size: 0.8rem;
            min-height: 4rem;
        }
    }
`

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 80vw;
    min-width: 300px;
    gap: 4rem;
    min-height: 50vh;
    >*{
        flex: 1 0 46%;
    }
    >${StyledList}{
        flex: 0;
    }
    ul{
        max-height: 50vh;
    }

`