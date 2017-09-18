import React, { Component } from 'react';
import Menu from './Components/Menu';
import BookFilter from './Components/BookFilter';
import BookForm from './Components/BookForm';
import BookList from './Components/BookList';
import GenreForm from './Components/GenreForm';
import GenreList from './Components/GenreList';
import db from './mockDB';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      filteredBooks: [],
      isLoading: true,
      genres: [],
      route: 'books',
      selectedGenre: 'all',
      bookFormOpen: false,
      genreFormOpen: false,
      bookForm: {
        id: null,
        title: '',
        author: '',
        price: '€',
        genre: ''
      },
      genreForm: {
        id: null,
        name: ''
      },
      editBookFormOpen: false,
      bookToEdit: {},
      editGenreFormOpen: false,
      genreToEdit: {}
    };
  }
  getBooks() {
    db.getBooks().then(books => {
      this.setState(
        {
          books,
          isLoading: false
        },
        () => this.filterBooks()
      );
    });
  }
  getGenres() {
    db.getGenres().then(genres => {
      this.setState({
        genres
      });
    });
  }
  componentWillMount() {
    this.getBooks();
    this.getGenres();
  }
  onMenuClick(route) {
    this.setState({
      route,
      bookFormOpen: false,
      genreFormOpen: false
    });
  }
  genreChange(e) {
    e.preventDefault();
    this.setState(
      {
        selectedGenre: e.target.value
      },
      () => this.filterBooks()
    );
  }
  filterBooks() {
    let { books, selectedGenre, genres } = this.state;
    // rearrange list of books in most recently added order
    books = books.sort((a, b) => b.id - a.id);
    // check if selected genre exists in list of genres, if not, default filter to all books
    const genreExists =
      genres.findIndex(genre => genre.name === selectedGenre) === -1 ? false : true;
    selectedGenre = genreExists ? selectedGenre : 'all';
    // filter books to selected genre
    const filteredBooks =
      selectedGenre === 'all'
        ? books
        : books.filter(book => book.genre === selectedGenre);
    this.setState({
      filteredBooks: filteredBooks
    });
  }
  toggleBookForm() {
    let bookFormOpen = this.state.bookFormOpen;
    bookFormOpen = !bookFormOpen;
    this.setState({
      bookFormOpen,
      editBookFormOpen: false
    });
  }
  toggleGenreForm() {
    let genreFormOpen = this.state.genreFormOpen;
    genreFormOpen = !genreFormOpen;
    this.setState({
      genreFormOpen
    });
  }
  deleteBook(id) {
    let { books } = this.state;
    let index = books.findIndex(book => book.id === id);
    const bookTitle = books[index].title;
    // remove book from books array
    books = [...books.slice(0, index), ...books.slice(index + 1)];
    this.setState(
      {
        books
      },
      () => {
        alert(`${bookTitle} has been deleted`);
        return this.filterBooks();
      }
    );
  }
  deleteGenre(id) {
    let { genres, books } = this.state;
    let index = genres.findIndex(genre => genre.id === id);
    let genreName = genres[index].name;
    // remove genre from genres array
    genres = [...genres.slice(0, index), ...genres.slice(index + 1)];
    // remove books that contain the genre being deleted
    books = books.filter(book => {
      return book.genre !== genreName;
    });
    this.setState(
      {
        genres,
        books
      },
      () => {
        alert(`The ${genreName} genre and associated books have been deleted`);
        return this.filterBooks();
      }
    );
  }
  updateBookForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    let { bookForm } = this.state;
    bookForm[name] = value;
    this.setState({
      bookForm
    });
  }
  saveBook() {
    let { books, bookForm, genres } = this.state;
    // alert if any form fields are empty
    if (
      !bookForm.title.trim().length ||
      !bookForm.author.trim().length ||
      !bookForm.price.trim().length ||
      !bookForm.genre.trim().length
    ) {
      alert('Please complete all fields');
      return;
    }
    const title = bookForm.title;
    // create id for new book
    let id = books.slice().sort((a, b) => a.id > b.id)[books.length - 1].id;
    id++;
    bookForm.id = id;
    // append new book to books array
    books.push(bookForm);
    // add genre to genre array if genre doesn't already exist
    if (
      bookForm.genre.length &&
      genres.findIndex(genre => genre.name === bookForm.genre) === -1
    ) {
      let genreId = genres.slice().sort((a, b) => a.id > b.id)[genres.length - 1].id;
      genreId++;
      let newGenre = {
        id: genreId,
        name: bookForm.genre
      };
      genres.push(newGenre);
      this.setState(
        {
          genres
        },
        () => alert(`The new genre '${bookForm.genre}' has been added to genres`)
      );
    }
    const emptyBookForm = {
      id: null,
      title: '',
      author: '',
      price: '',
      genre: ''
    };
    this.setState(
      {
        books,
        bookForm: emptyBookForm,
        bookFormOpen: false
      },
      () => {
        alert(`${title} has been added`);
        return this.filterBooks();
      }
    );
  }
  clearBookForm() {
    const emptyBookForm = {
      id: null,
      title: '',
      author: '',
      price: '',
      genre: ''
    };
    this.setState(
      {
        bookForm: emptyBookForm
      },
      () => this.toggleBookForm()
    );
  }
  updateGenreForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    let { genreForm } = this.state;
    genreForm[name] = value;
    this.setState({
      genreForm
    });
  }
  saveGenre() {
    let { genres, genreForm } = this.state;
    // alert if field is empty
    if (!genreForm.name.trim().length) {
      alert('Please enter a genre name');
      return;
    }
    // create id for new genre
    let id = genres.slice().sort((a, b) => a.id > b.id)[genres.length - 1].id;
    id++;
    genreForm.id = id;
    const name = genreForm.name;
    // append new genre to genres array
    genres.push(genreForm);

    const emptyGenreForm = {
      id: null,
      name: ''
    };
    this.setState(
      {
        genres,
        genreForm: emptyGenreForm,
        genreFormOpen: false
      },
      () => alert(`${name} has been added`)
    );
  }
  clearGenreForm() {
    const emptyGenreForm = {
      id: null,
      name: ''
    };
    this.setState(
      {
        genreForm: emptyGenreForm
      },
      () => this.toggleGenreForm()
    );
  }
  toggleEditBookForm(id) {
    let { books, editBookFormOpen } = this.state;
    editBookFormOpen = !editBookFormOpen;
    let index = books.findIndex(book => book.id === id);
    let bookToEdit = Object.assign({}, [...books][index]);
    this.setState({
      editBookFormOpen,
      bookToEdit,
      bookFormOpen: false
    });
  }
  saveEditBook() {
    let { books, bookToEdit, genres, genreForm } = this.state;
    bookToEdit = Object.assign({}, bookToEdit);
    let index = books.findIndex(book => book.id === bookToEdit.id);
    books = [...books.slice(0, index), bookToEdit, ...books.slice(index + 1)];

    // if genre is changed and doesn't exist in genre list, add new genre to list of genres
    let genreExists =
      genres.findIndex(genre => genre.name === bookToEdit.genre) === -1 ? false : true;
    if (!genreExists) {
      // clear genre form
      genreForm = { id: null, name: '' };
      // create id for new genre
      let id = genres.slice().sort((a, b) => a.id > b.id)[genres.length - 1].id;
      id++;
      genreForm = {
        id,
        name: bookToEdit.genre
      };
      // append new genre to genres array
      genres.push(genreForm);
      const emptyGenreForm = {
        id: null,
        name: ''
      };
      this.setState(
        {
          genres,
          genreForm: emptyGenreForm
        },
        () => alert(`The new genre '${bookToEdit.genre}' has been added to genres`)
      );
    }
    this.setState(
      {
        books,
        editBookFormOpen: false
      },
      () => {
        alert(`Changes have been updated`);
        return this.filterBooks();
      }
    );
  }
  updateEditBookForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    let { bookToEdit } = this.state;
    bookToEdit[name] = value;
    this.setState({
      bookToEdit
    });
  }
  clearEditBookForm() {
    let { bookToEdit, editBookFormOpen } = this.state;
    bookToEdit = {};
    editBookFormOpen = false;
    this.setState({
      bookToEdit,
      editBookFormOpen
    });
  }
  toggleEditGenreForm(id) {
    let { genres, editGenreFormOpen } = this.state;
    editGenreFormOpen = !editGenreFormOpen;
    let index = genres.findIndex(genre => genre.id === id);
    let genreToEdit = Object.assign({}, [...genres][index]);
    this.setState({
      editGenreFormOpen,
      genreToEdit
    });
  }
  saveEditGenre() {
    let { genres, genreToEdit, books } = this.state;
    genreToEdit = Object.assign({}, genreToEdit);
    let index = genres.findIndex(genre => genre.id === genreToEdit.id);
    const originalGenre = genres[index].name;
    // update books containing original genre to now include edited genre
    books = books.map(book => {
      if (book.genre === genres[index].name) {
        book.genre = genreToEdit.name;
      }
      return book;
    });
    // update genres array with edited genre
    genres = [...genres.slice(0, index), genreToEdit, ...genres.slice(index + 1)];

    this.setState(
      {
        genres,
        books,
        editGenreFormOpen: false
      },
      () => {
        alert(`${originalGenre} has been updated`);
        return this.filterBooks();
      }
    );
  }
  updateEditGenreForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    let { genreToEdit } = this.state;
    genreToEdit[name] = value;
    this.setState({
      genreToEdit
    });
  }
  clearEditGenreForm() {
    let { genreToEdit, editGenreFormOpen } = this.state;
    genreToEdit = {};
    editGenreFormOpen = false;
    this.setState({
      genreToEdit,
      editGenreFormOpen
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <div className="container">
          <Menu route={this.state.route} onMenuClick={route => this.onMenuClick(route)} />
          <main>
            {this.state.route === 'books'
              ? <div>
                  <div className="content-menu">
                    {!this.state.bookFormOpen &&
                      <BookFilter
                        genres={this.state.genres}
                        genreChange={e => this.genreChange(e)}
                        selectedGenre={this.state.selectedGenre}
                      />}
                    <BookForm
                      bookFormOpen={this.state.bookFormOpen}
                      toggleBookForm={() => this.toggleBookForm()}
                      saveBook={() => this.saveBook()}
                      updateBookForm={e => this.updateBookForm(e)}
                      bookForm={this.state.bookForm}
                      clearBookForm={() => this.clearBookForm()}
                    />
                  </div>
                  <BookList
                    books={this.state.filteredBooks}
                    toggleEditBookForm={id => this.toggleEditBookForm(id)}
                    deleteBook={id => this.deleteBook(id)}
                    editBookFormOpen={this.state.editBookFormOpen}
                    bookToEdit={this.state.bookToEdit}
                    saveEditBook={() => this.saveEditBook()}
                    updateEditBookForm={e => this.updateEditBookForm(e)}
                    clearEditBookForm={() => this.clearEditBookForm()}
                  />
                </div>
              : <div>
                  <div className="content-menu">
                    <GenreForm
                      genreFormOpen={this.state.genreFormOpen}
                      toggleGenreForm={() => this.toggleGenreForm()}
                      saveGenre={() => this.saveGenre()}
                      updateGenreForm={e => this.updateGenreForm(e)}
                      genreForm={this.state.genreForm}
                      clearGenreForm={() => this.clearGenreForm()}
                    />
                  </div>

                  <GenreList
                    genres={this.state.genres}
                    toggleEditGenreForm={id => this.toggleEditGenreForm(id)}
                    deleteGenre={id => this.deleteGenre(id)}
                    editGenreFormOpen={this.state.editGenreFormOpen}
                    genreToEdit={this.state.genreToEdit}
                    saveEditGenre={() => this.saveEditGenre()}
                    updateEditGenreForm={e => this.updateEditGenreForm(e)}
                    clearEditGenreForm={() => this.clearEditGenreForm()}
                  />
                </div>}
          </main>
        </div>
      );
    }
  }
}

export default App;
