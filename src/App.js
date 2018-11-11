import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBookShelf = (event, book) => {

    let newShelf = event.target.options[event.target.selectedIndex].value;
    //got some help on this function from https://github.com/sarah-maris/reactnd-project-myreads/blob/master/src/components/Search.js

      book.shelf = newShelf;
      this.setState((state) => ({
        books: state.books
        .filter(b => b.id !== book.id)
        .concat(book)

      }))
      BooksAPI.update(book,newShelf);

    }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
          books={this.state.books}
          onUpdateToRead={this.updateBookShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchPage
          onUpdateToRead={this.updateBookShelf}
          books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
