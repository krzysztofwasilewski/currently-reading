import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookGrid from './BookGrid';
import {search} from './BooksAPI';
import {debounce} from 'lodash';
import PropTypes from 'prop-types';

/**
 * @description Component for rendering the search view. The only other stateful component because it needs to store the search results obtained from server. COnsists of back navigation, search term input field and results (reused book grid component).
 */
class SearchView extends Component {
  state = {
    term: '',
    results: []
  };

  /**
   * @description Function used whenever the user modifies the search term in the input box. Debounced with 500 ms limit. If the term is empty, it just clears the results instead of asking the server.
   * @param term {string} - the query to search in the book database.
   */
  getSearchResults = debounce(
    term =>
      term
        ? search(term, 20).then(results =>
            this.setState(
              // if the search results in error, result is not an array but an error object
              {results: Array.isArray(results) ? results : []}
            )
          )
        : // Don't request anything if the search term is empty, just clear the result list
          this.setState({results: []}),
    500
  );

  /**
   * @description Callback whenever anything chages in the input field. Invokes the search.
   * @param e {SyntheticEvent}
   */
  handleTermUpdate = e => this.setState({term: e.target.value});

  /**
   * Called whenever something was updated. We are only interested in when the input changed, so that we refetch the results.
   */
  componentDidUpdate(_prevProps, prevState) {
    // if the search term's changed, request new results from the backend
    if (prevState.term !== this.state.term) {
      this.getSearchResults(this.state.term.trim());
    }
    // otherwise do nothing, avoid infinite loop.
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              value={this.state.term}
              onChange={this.handleTermUpdate}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid
            books={this.state.results}
            onShelfChanged={this.props.onShelfChanged}
            shelfChecker={this.props.shelfChecker}
          />
        </div>
      </div>
    );
  }
}

SearchView.propTypes = {
  shelfChecker: PropTypes.func.isRequired,
  onShelfChanged: PropTypes.func.isRequired
};

export default SearchView;
