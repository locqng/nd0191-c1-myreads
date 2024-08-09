import { Link } from "react-router-dom";
import { NotInShelf } from "../utils/BooksConst";
import Book from "./Book";
import { useState } from "react";

const SearchShelf = ({onSearchBooks, onUpdateShelf}) => {
    
    const [searchedBooks, setSearchedBooks] = useState([]);
    
    const searchBooks = async (event) => {
        if (event.target.value === '') {
            setSearchedBooks([]);
            return;
        }
 
        const response = await onSearchBooks(event.target.value)
        if(response.length > 0 && event.target.value !== '') {
            setSearchedBooks(response);
        } else {
            setSearchedBooks([]);
        }
          
    }

    const removeFromShelf = (bookId) => {
        setSearchedBooks(searchedBooks.filter(x => x.id !== bookId));
    } 

    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link
                className="close-search"
                to="/"
            >
                Close
            </Link>
            <div className="search-books-input-wrapper">
                <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={searchBooks}
                />
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                {searchedBooks.length > 0 && (
                    searchedBooks.map((book) => (
                        <Book key={book.id} book={book} 
                            shelfName={NotInShelf} 
                            onUpdateShelf={onUpdateShelf}
                            onRemoveFromShelf={removeFromShelf}/>
                    ))
                )
                }
            </ol>
            </div>
        </div>
    );
}

export default SearchShelf;