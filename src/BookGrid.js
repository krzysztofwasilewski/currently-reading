import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * @description Book grid is shared by both shelf view and search view. Displayes all the books passed to it (typically form one shelf, or all search results).
 */
const BookGrid = ({books, onShelfChanged, shelfChecker}) => (
  <ol className="books-grid">
    {_(books)
      .sortBy(['title', 'authors[0]', 'authors[1]', 'authors[2]'])
      .map(book => (
        <li key={book.id}>
          <Book
            {...book}
            shelfChecker={shelfChecker}
            onShelfChanged={onShelfChanged(book.id)}
          />
        </li>
      ))
      .value()}
  </ol>
);

BookGrid.propTypes = {
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
  onShelfChanged: PropTypes.func.isRequired,
  shelfChecker: PropTypes.func.isRequired
};

export default BookGrid;
