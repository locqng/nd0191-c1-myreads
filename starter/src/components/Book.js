import { useState } from "react";
import * as BooksConst from "../utils/BooksConst"
const Book = ({book, onUpdateShelf, shelfName, onRemoveFromShelf}) => {

    const updateShelf = (event) => {
        onUpdateShelf(book, event.target.value);
        setShelf(event.target.value);
        if (!!onRemoveFromShelf) {
            onRemoveFromShelf(book.id);
        }
    }

    const [shelf, setShelf] = useState(shelfName);

    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                        `url("${book.imageLinks.smallThumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select defaultValue={shelf} onChange={updateShelf}>
                    <option value={BooksConst.NotInShelf} disabled>
                        Move to...
                    </option>
                    <option value={BooksConst.CurrentlyReadingShelf}>
                        Currently Reading
                    </option>
                    <option value={BooksConst.WantToReadShelf}>Want to Read</option>
                    <option value={BooksConst.ReadShelf}>Read</option>
                    {shelf !== BooksConst.NotInShelf && (<option value={BooksConst.NotInShelf}>None</option>)}
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                {!!book.authors && book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>)
                )}
            </div>
        </li>
    );
}

export default Book;