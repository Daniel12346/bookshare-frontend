import BookList from "components/BookList";
import Loader from "components/Loader";
import { Column } from "components/styled/utils";
import { StyledButton } from "components/StyledButton";
import { StyledH1 } from "components/StyledH1";
import { ME_QUERY } from "graphql/queries";
import { Book, useAddBookToWantedMutation, useBooksQuery, useMeQuery } from "graphql/types";
import React, { useState } from "react"
import styled from "styled-components";



export default () => {
    const { data, loading, error } = useMeQuery();
    const me = data?.me;
    const myWantedBooks = me?.wanted ?? [];
    const { data: dataBooks, loading: loadingAll, error: errorAll } = useBooksQuery();
    const allBooks = dataBooks?.books ?? [];
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [id, setId] = useState("");
    const [addBookToWanted] = useAddBookToWantedMutation()
    const [filtered, setFiltered] = useState<Book[]>();

    const handleAutoFill = (book: Book) => {
        setTitle(book.name);
        setAuthor(book.author);
        setYear(book.year?.toString() as string);
        setId(book.id);
    }

    const handleAddToWishlist = (e: React.FormEvent<HTMLFormElement>) => {
        //TODO: createBook umisto return
        if (!id) return;
        e.preventDefault();
        //TODO: optimistic response ili nisto drugo
        //????????
        addBookToWanted({ variables: { userId: me?.id, bookId: id }, refetchQueries: [{ query: ME_QUERY }] });
        setYear("");
        setId("");
        setTitle("");
        setAuthor("");
    }


    return <StyledScreenContainer>
        <StyledContainer>
            {/* //TODO: ! */}
            <StyledH1>Wishlist</StyledH1>
            <Column>
                <StyledForm onSubmit={handleAddToWishlist} >
                    <span>search book to add by title, author, etc.</span>
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

                        <StyledButton id="logIn" type="submit">Add to wishlist</StyledButton>
                    </div>
                </StyledForm >
                <BookSuggestionList books={filtered as Book[]} handleAutoFill={handleAutoFill}></BookSuggestionList>
            </Column>
            <Column id="bookListColumn">
                <BookList books={myWantedBooks as Book[]}></BookList>
            </Column>
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
    display: flex;
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
    justify-content: space-evenly;
   ul{
       max-height: 70vh;
       overflow-y: scroll;
   }
   ${StyledList}{
       max-height: 25vh;
   }
   ${StyledH1}{
        flex: 1 1 100%;
        font-size: 2.5rem;
        padding: 0 2rem;
        color: ${({ theme }) => theme.colors.primary2}; 
        margin: 2vh 0 -2vh 0;
   }
   ${Column}{
       >*{
           width: 100%;
       }
   }
   #bookListColumn{
       max-width: 20rem;
       width: 100%;
   }
`