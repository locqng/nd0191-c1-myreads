import ShelfRow from "./ShelfRow";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BookShelf = ({bookShelf, onUpdateShelf}) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div>
                {bookShelf.map((row) => (
                    <ShelfRow key={row.name} row={row} onUpdateShelf={onUpdateShelf}/>
                ))}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
        
    );
}

export default BookShelf;

BookShelf.propTypes = {
    bookShelf: PropTypes.array,
    onUpdateShelf: PropTypes.func
}