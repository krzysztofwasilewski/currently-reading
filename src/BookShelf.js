import React from 'react';
import BookGrid from './BookGrid';
import {camelCase} from 'lodash';
import PropTypes from 'prop-types';

/**
 * @description Compnent for rendering one Shelf sectio in the main screen
 */
const BookShelf = ({shelf, books, ...other}) => {
  const camelizedShelf = camelCase(shelf);
  const booksFromShelf = books.filter(book => book.shelf === camelizedShelf);
  return booksFromShelf.length ? (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <BookGrid books={booksFromShelf} {...other} />
      </div>
    </div>
  ) : null;
};

BookShelf.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string,
        thumbnail: PropTypes.string
      })
    })
  ),
  onShelfChanged: PropTypes.func,
  shelf: PropTypes.string,
  shelfChecker: PropTypes.func.isRequired
};
export default BookShelf;
