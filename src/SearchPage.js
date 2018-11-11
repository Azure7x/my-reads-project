import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
//got some help on this page from https://github.com/sarah-maris/reactnd-project-myreads/blob/master/src/components/Search.js
  state ={
    books: [],
    query: ''
  }

  loadBooks = event => {
    const query = event.target.value;
    this.setState({query});

    if(query) {
      BooksAPI.search(query.trim(), 20).then(newbooks => {
        newbooks.length > 0
        ? this.setState({
          books: newbooks.map((newBook) => {
            //this set the default shelf for the searched books to none
            newBook.shelf = 'none';
            this.props.books.map((b) => {
              //this changes the shelf for the searched book to match the saved book if there is one
              if(newBook.id === b.id){
                newBook.shelf = b.shelf;
              }
              return b;
            })
            return newBook;
          })
        })
        : this.setState({books: []});
      })
    } else {
      this.setState({ books: []});
    }
  }

  markBooks = () => {

  }

  render() {

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
            value={this.state.query}
            onChange={this.loadBooks}
            type="text"
            placeholder="Search by title or author"
            />
            <div>{JSON.stringify(this.state.query)}</div>
          </div>
        </div>
        {this.state.books.length  && (
          <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.props.onUpdateToRead(event,book)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>)}
      </div>
    )
  }
}

export default SearchPage
