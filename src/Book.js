import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';
import ToolTip from './ToolTip';
/**
 * @description Component for rendering one book. Usually should be placed in a grid.
 */
const Book = ({
  title,
  authors,
  imageLinks,
  description,
  shelf,
  onShelfChanged,
  shelfChecker,
  id
}) => {
  // if there is any image link then prefer the larger thumbnail...
  const imageUrl =
    imageLinks && (imageLinks.thumbnail || imageLinks.smallThumbnail);
  // ... and if there is no thumbnails, then let's just use a gray background
  const bookBackground = imageUrl ? `url(${imageUrl})` : 'grey';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{width: 128, height: 188, background: bookBackground}}
        >
          {description && <ToolTip text={description} />}
        </div>
        <BookShelfChanger
          selectedShelf={shelfChecker(id)}
          onShelfChanged={onShelfChanged}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(', ')}</div>
    </div>
  );
};
Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
    thumbnail: PropTypes.string
  }),
  description: PropTypes.string,
  shelf: PropTypes.string,
  onShelfChanged: PropTypes.func.isRequired,
  shelfChecker: PropTypes.func.isRequired
};
export default Book;
