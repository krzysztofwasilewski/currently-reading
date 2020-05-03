import React from 'react';
import './App.css';
import SearchView from './SearchView';
import BookList from './BookList';
import {BrowserRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getAll, update} from './BooksAPI';

/**
 * @description The static list of shelf names. You can easily add more by adding them to this one place, but currently the backend doesn't support others.
 */
const ALL_SHELVES = ['Want to Read', 'Read', 'Currently Reading'];

class BooksApp extends React.Component {
  state = {allBooks: []};
  /**
   * @description Fetches all books assigned to any shelf from the server and stores them in the component's state.
   */
  getAllBooks = () => getAll().then(allBooks => this.setState({allBooks}));

  /**
   * @description Triggered whenever this app is assigned to dom (basically when this app is launched). Causes fetching the list of all my books form the server.
   */
  componentDidMount() {
    this.getAllBooks();
  }

  /*
   * @description adjusts the shelf name for a book stored in the local cache (`this.state` variable). Invoking this function is optional but it makes the UI more responsive as the state updates immediately and not only after a roundtrip to the backend. Eventually the local state is going to be overriden by a fetch from server, which is the master source of truth.
   * @param bookID {string} - the ID of the book to update
   * @param shelf {string} - the name of the shelf to which the book should be assigned. Currently can be any of `'wantToRead'`, `'read'`, `'currentlyReading'`, or `'none'`.
   * @returns {Promise} - for chaining with the server update that follows. We want to be sure that there is no race condition between the local and server state, so we ensure the server is updated last.
   */
  updateShelfLocally = (bookID, shelf) => {
    const updateOperation = (resolve) => this.setState(prevState => {
      // if we can't find the book, it means it's not pn any shelf, so let's just create a new one temporarily before re-fetching all from the server.
      const changedBook = prevState.allBooks.find(({id}) => id === bookID) || {
        id: bookID
      };
      changedBook.shelf = shelf;
      console.log(changedBook);
      // recreate the book list with removed old book and added the new one
      return {
        allbooks: [
          ...prevState.allBooks.filter(({id}) => id !== bookID),
          changedBook
        ]
      };
    }, resolve);
    return new Promise (updateOperation);
  };

  /*
   * @description adjusts the shelf name for a book stored in the backend. After a successful update, the local state is re-fetched from the server.
   * @param bookID {string} - the ID of the book to update
   * @param shelf {string} - the name of the shelf to which the book should be assigned. Currently can be any of `'wantToRead'`, `'read'`, `'currentlyReading'`, or `'none'`.
   */
  updateShelfOnServer = (id, shelf) => {
    update({id}, shelf).then(this.getAllBooks);
  };

  /*
   * @description Adjusts the shelf name for a book. The function can be partially applied so that the invoking component doesn't need to know which book this is. It first updates thelocal cache of books so that there is ni delay between moving the book between the shelf and the display of the shelf, then updates the server state.
   * @param bookID {string} - the ID of the book to update
   * @param shelf {string} - the name of the shelf to which the book should be assigned. Currently can be any of `'wantToRead'`, `'read'`, `'currentlyReading'`, or `'none'`.
   */
  changeShelf = bookID => shelf => {
    this.updateShelfLocally(bookID, shelf)
    .then(() => this.updateShelfOnServer(bookID, shelf));
  };

  /**
   * @description Tells to which shelf a book belongs (needed because books in the search are missing this information
   * @param bookID {string}
   * @returns {string} the name of the shelf, or `'none'` if this book is not on any shelf (only in search results).
   */
  shelfForAnyBook = bookID =>
    (this.state.allBooks.find(({id}) => id === bookID) || {shelf: 'none'})
      .shelf;

  /**
   * @description Injects the list of all shelf names into the context, so that this static information doesn't need to be passed five component levels down.
   */
  getChildContext() {
    return {allShelves: ALL_SHELVES};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search">
            <SearchView
              onShelfChanged={this.changeShelf}
              shelfChecker={this.shelfForAnyBook}
            />
          </Route>
          <Route exact path="/">
            <BookList
              onShelfChanged={this.changeShelf}
              allBooks={this.state.allBooks}
              shelfChecker={this.shelfForAnyBook}
            />
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

BooksApp.childContextTypes = {
  allShelves: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BooksApp;
