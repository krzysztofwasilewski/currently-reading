import React from 'react';
import PropTypes from 'prop-types';
import {camelCase} from 'lodash';

/**
 * @description the component that shows up when you press the green down arrow, for viewing and selecting which shelf the book belongs to. The context is used to get the static list of all shelves (human readable), which is later converted to camel case which is used by the backend API.
 */
const BookShelfChanger = ({selectedShelf, onShelfChanged}, context) => (
  <div className="book-shelf-changer">
    <select
      value={selectedShelf}
      onChange={e => onShelfChanged(e.target.value)}
    >
      <option value="move" disabled>
        Move to...
      </option>
      {context.allShelves.map(shelf => (
        <option key={shelf} value={camelCase(shelf)}>
          {shelf}
        </option>
      ))}
      <option value="none">None</option>
    </select>
  </div>
);
BookShelfChanger.contextTypes = {
  allShelves: PropTypes.arrayOf(PropTypes.string).isRequired
};

BookShelfChanger.propTypes = {
  selectedShelf: PropTypes.string.isRequired,
  onShelfChanged: PropTypes.func.isRequired
};
export default BookShelfChanger;
