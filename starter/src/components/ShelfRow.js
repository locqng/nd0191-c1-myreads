import Book from "./Book";
import PropTypes from "prop-types";

const ShelfRow = ({row, onUpdateShelf}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{row.name}</h2>   
            <div className="bookshelf-books">
                {row.books.length > 0 && (
                <ol className="books-grid">
                    {row.books.map((book) => (
                        <Book key={book.id} book={book} shelfName={row.key} onUpdateShelf={onUpdateShelf}/>
                    ))}
                </ol>)}
            </div>
        </div>
    );
}

export default ShelfRow;

ShelfRow.propTypes = {
    row: PropTypes.object,
    onUpdateShelf: PropTypes.func
}