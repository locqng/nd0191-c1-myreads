import { useState } from "react";
import * as BooksConst from "../utils/BooksConst"
import PropTypes from "prop-types";

const shelves = [
    {id: "1", shelfName: BooksConst.CurrentlyReadingShelf, shelfDisplayName: "Currently Reading"},
    {id: "2", shelfName: BooksConst.WantToReadShelf, shelfDisplayName: "Want to Read"},
    {id: "3", shelfName: BooksConst.ReadShelf, shelfDisplayName: "Read"},
    {id: "4", shelfName: BooksConst.NotInShelf, shelfDisplayName: "None"},
];

const Book = ({book, onUpdateShelf, shelfName}) => {

    const updateShelf = (event) => {
        onUpdateShelf(book, event.target.value);
        setShelf(event.target.value);
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
                    <option value="" disabled>
                        Move to...
                    </option>
                    {shelves.map(x => (
                        <option value={x.shelfName}>
                            {x.shelfDisplayName}
                        </option>
                    ))}
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

Book.propTypes = {
    book: PropTypes.object,
    onUpdateShelf: PropTypes.func,
    shelfName: PropTypes.string
}