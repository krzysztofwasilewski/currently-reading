import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

/**
 * @description The main view of the app, with 3 shelves.
 */
const BookList = ({onShelfChanged, shelfChecker, allBooks}, context) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {context.allShelves.map(shelf => (
            <BookShelf
              key={shelf}
              shelf={shelf}
              books={allBooks}
              shelfChecker={shelfChecker}
              onShelfChanged={onShelfChanged}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  shelfChecker: PropTypes.func.isRequired,
  onShelfChanged: PropTypes.func.isRequired
};

BookList.contextTypes = {
  allShelves: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default BookList;
