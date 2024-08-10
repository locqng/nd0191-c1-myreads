import { Link } from "react-router-dom";
import { NotInShelf } from "../utils/BooksConst";
import Book from "./Book";
import { useState } from "react";
import PropTypes from "prop-types";

const SearchShelf = ({onSearchBooks, onUpdateShelf, addedBooks}) => {

    const debounce = (func, timeout = 500) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
    
    const [searchedBooks, setSearchedBooks] = useState(null);
    
    const searchBooks = async (event) => {
        if (event.target.value === '') {
            setSearchedBooks(null);
            return;
        }
 
        const response = await onSearchBooks(event.target.value)
        if(response.length > 0 && event.target.value !== '') {
            setSearchedBooks(response.filter(x => !!x.imageLinks));
        } else {
            setSearchedBooks([]);
        }   
    }

    const processKey = debounce(searchBooks);

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
                onChange={processKey}
                />
            </div>
            </div>
            {!!searchedBooks && (
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchedBooks.length > 0 ? (
                        searchedBooks.map((book) => {
                            const addedBook = addedBooks.find(x => x.id === book.id);
                            return <Book key={book.id} book={book} 
                                shelfName={!!addedBook ? addedBook.shelf :  NotInShelf} 
                                onUpdateShelf={onUpdateShelf}
                            />
                        })
                    ) : 
                    <h2>No Books Found</h2>
                    }
                </ol>
            </div>
            )}
        </div>
    );
}

export default SearchShelf;

SearchShelf.porpTypes = {
    onSearchBooks: PropTypes.func,
    onUpdateShelf: PropTypes.func,
    addedBooks: PropTypes.array
}