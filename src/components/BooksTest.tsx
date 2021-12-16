import React from "react"
import { useBooksQuery } from "graphql/types"
import Loader from "./Loader";
export default () => {
    const { data, loading, error } = useBooksQuery()
    error && console.log(error);
    const books = data?.books;
    return (
        <>
            {loading && <Loader></Loader>}
            <ul>
                {books && books.map(book => <li>{book?.name}</li>)}
            </ul>
        </>
    )
}