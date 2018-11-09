import React, { Component } from 'react';


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
                  <li key={book.industryIdentifiers[0].identifier}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select>
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
          <a onClick={() => this.props.onShowSearch()}>Add a book</a>
        </div>
      </div>

  )
  }
}

export default BookList
