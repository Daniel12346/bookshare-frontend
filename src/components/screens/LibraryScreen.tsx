import BookList from "components/BookList";
import Loader from "components/Loader";
import { Column } from "components/styled/utils";
import { StyledButton } from "components/StyledButton";
import { StyledH1 } from "components/StyledH1";
import { ME_QUERY } from "graphql/queries";
import { Book, useAddBookToOwnedMutation, useBooksQuery, useMeQuery } from "graphql/types";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { stringIsEmpty } from "../../utils/stringIsEmpty";



export default () => {
    const { data, loading, error } = useBooksQuery();
    const allBooks = data?.books ?? [];
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState<Book[]>();

    useEffect(() => {
        setFiltered(allBooks as Book[]);
    }, [data, allBooks])

    return <StyledScreenContainer>
        <StyledContainer>

            <StyledH1>Library</StyledH1>
            {loading ? <Loader></Loader> : (
                <><span>search book by title, author, etc.</span>
                    <input value={value} type="text" onChange={e => {
                        setFiltered(handleSearchBooks({ books: allBooks as Book[], value: e.target.value }))
                        setValue(e.target.value);
                    }} />
                    <StyledBookListContainer>
                        <BookList books={filtered as Book[]}></BookList>
                    </StyledBookListContainer></>)
            }
        </StyledContainer>
    </StyledScreenContainer>
}

const StyledBookListContainer = styled.div`
    background: ${({ theme }) => theme.colors.primary2};
    padding: 2%;
    ul{
        flex-flow: row wrap;
        gap: 2rem;
        >*{
            flex: 0 1 30%;
            min-width: 200px;
            background: ${({ theme }) => theme.colors.primary1}
        }
    }
`

interface TSearch {
    books: Book[],
    value: string
}
const handleSearchBooks = ({ books, value }: TSearch) => {
    console.log(books, value);
    return books.filter(book =>
        (book.name.includes(value) || book.author.includes(value) || book.year?.toString().includes(value))
    )
}


const StyledScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;

`
const StyledContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 80vw;
    min-width: 300px;
    gap: 4rem;
    min-height: 50vh;
    align-items: center;
   ul{
       max-height: 70vh;
       overflow-y: scroll;
   }
  
   ${StyledH1}{
        flex: 0 1 100%;
        font-size: 2.5rem;
        padding: 0 2rem;
        color: ${({ theme }) => theme.colors.primary2}; 
        margin: 2vh 0 -2vh 0;
   }

   input{
    opacity: 0.6;
    background: none;
    min-width: 200px;
    width: 10%;
    margin-bottom: 0.2rem;
    align-self: center;
    min-height: 1.4rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary4};
  }

`