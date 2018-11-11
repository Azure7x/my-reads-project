import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class BookList extends Component {

  render() {

    const shelfArray = [
      ['Currently Reading', 'currentlyReading'],
      ['Want To Read', 'wantToRead'],
      ['Read', 'read']
    ]

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {/*this creates three shelves by mapping over the shelfArray and changing the title
            and current books that belong on the shelf based on the current array in the map*/}
          {shelfArray.map((shelf) => (
              <div key={shelf[0]} className="bookshelf">
              {/*the first index of the current array determines the shelf title*/}
              <h2 className="bookshelf-title">{shelf[0]}</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                {/*this filter only displays the books that are supposed to be on the shelf*/}
                {this.props.books.filter((book) => {
                  {/*the second index of the current array determines the books on the shelf*/}
                  return book.shelf === shelf[1];
                }).map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                          {/*got help with select and shelf section from https://stackoverflow.com/questions/3487263/how-to-use-onclick-or-onselect-on-option-tag-in-a-jsp-page */}
                            <select value={book.shelf} onChange={(event) => this.props.onUpdateToRead(event,book,this.props.books)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors[0]}</div>
                    </div>
                  </li>
                ))}
              </ol>
              </div>
              </div>
          ))}

          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

  )
  }
}

export default BookList
