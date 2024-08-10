import "../css/App.css";
import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI"
import * as BooksConst from "../utils/BooksConst"
import BookShelf from "./BookShelf";
import SearchShelf from "./SearchShelf";

function App() {
  
  const [allBooks, setAllBooks] = useState([]);

  const [bookShelf, setBookShelf] = useState([]);
  
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await BooksAPI.getAll();
      setAllBooks(response);
      setBookShelf([
        {key: BooksConst.CurrentlyReadingShelf ,name: "Currently Reading" , books: response.filter(book => book.shelf === BooksConst.CurrentlyReadingShelf)},
        {key: BooksConst.WantToReadShelf ,name: "Want To Read" , books: response.filter(book => book.shelf === BooksConst.WantToReadShelf)},
        {key: BooksConst.ReadShelf ,name: "Read" , books: response.filter(book => book.shelf === BooksConst.ReadShelf)}
      ]);
    }
    getAllBooks();
  }, []);
  
  const updateBookShelf = async (book, shelfKey) => {
    book.shelf = shelfKey;
    if (!book || !shelfKey) return;
    const res = await BooksAPI.update(book, shelfKey);
    setBookShelf([
      {key: BooksConst.CurrentlyReadingShelf ,name: "Currently Reading" , books: allBooks.filter(book => res[BooksConst.CurrentlyReadingShelf].includes(book.id))},
      {key: BooksConst.WantToReadShelf ,name: "Want To Read" , books: allBooks.filter(book => res[BooksConst.WantToReadShelf].includes(book.id))},
      {key: BooksConst.ReadShelf ,name: "Read" , books: allBooks.filter(book => res[BooksConst.ReadShelf].includes(book.id))}
    ]);
    if (!allBooks.some(x => x.id === book.id)) {
      console.log(true);
      setAllBooks([...allBooks, book]);
    }      
  }

  const searchBooks = async (keyword) => {
    const res = await BooksAPI.search(keyword);    
    return res;
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          exact 
          path="/"
          element={
            <BookShelf bookShelf={bookShelf} onUpdateShelf={updateBookShelf}/>
          }
        />
        <Route 
          path="/search"
          element={
            <SearchShelf onSearchBooks={searchBooks} onUpdateShelf={updateBookShelf} addedBooks={allBooks}/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
