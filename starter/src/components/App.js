import "../css/App.css";
import { useState } from "react";
import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI"
import * as BooksConst from "../utils/BooksConst"
import BookShelf from "./BookShelf";
import SearchShelf from "./SearchShelf";

function App() {
  
  const [allBooks, setAllBooks] = useState([]);

  const [bookShelf, setBookShelf] = useState([]);

  const [addedBooksId, setAddedBooksId] = useState([]);
  
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await BooksAPI.getAll();
      setAllBooks(response);
      setBookShelf([
        {key: BooksConst.CurrentlyReadingShelf ,name: "Currently Reading" , books: response.filter(book => book.shelf === BooksConst.CurrentlyReadingShelf)},
        {key: BooksConst.WantToReadShelf ,name: "Want To Read" , books: response.filter(book => book.shelf === BooksConst.WantToReadShelf)},
        {key: BooksConst.ReadShelf ,name: "Read" , books: response.filter(book => book.shelf === BooksConst.ReadShelf)}
      ]);
      const mergedBooks = response.map(x => x.id);
      setAddedBooksId(mergedBooks)
    }
    getAllBooks();
  }, []);
  
  const updateBookShelf = async (book, shelfKey) => {
    if (!book || !shelfKey) return;
    const res = await BooksAPI.update(book, shelfKey);
    const mergedBooks = res[BooksConst.CurrentlyReadingShelf].concat(res[BooksConst.WantToReadShelf], res[BooksConst.ReadShelf]);
    setBookShelf([
      {key: BooksConst.CurrentlyReadingShelf ,name: "Currently Reading" , books: allBooks.filter(book => res[BooksConst.CurrentlyReadingShelf].includes(book.id))},
      {key: BooksConst.WantToReadShelf ,name: "Want To Read" , books: allBooks.filter(book => res[BooksConst.WantToReadShelf].includes(book.id))},
      {key: BooksConst.ReadShelf ,name: "Read" , books: allBooks.filter(book => res[BooksConst.ReadShelf].includes(book.id))}
    ]);
    setAddedBooksId(mergedBooks)
  }

  const searchBooks = async (keyword) => {
    const res = await BooksAPI.search(keyword);
    if (res.length > 0) {
      const processingBooks = res.filter(x => !(addedBooksId.some(y => y === x.id)));
      const mergedBooks = allBooks.concat(res.filter(
        x => !allBooks.some(y => y.id === x.id)));
      setAllBooks(mergedBooks);
      return processingBooks;  
    }
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
            <SearchShelf onSearchBooks={searchBooks} onUpdateShelf={updateBookShelf}/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
