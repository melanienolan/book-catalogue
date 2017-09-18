import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';
import FaEdit from 'react-icons/lib/fa/edit';
import EditBookForm from './EditBookForm';

const BookList = props => {
  const renderList = () => {
    return props.books.map(book => {
      return (
        <li className="item" key={book.id}>
          <div className="item--details">
            <p className="item--text">
              <span className="item--field">Title:</span> {book.title}
            </p>
            <p className="item--text">
              <span className="item--field">Author:</span> {book.author}
            </p>
            <p className="item--text">
              <span className="item--field">Price:</span> {book.price}
            </p>
            <p className="item--text">
              <span className="item--field">Genre:</span> {book.genre}
            </p>
          </div>
          <div className="item--buttons">
            <button
              className="button button--item"
              onClick={() => props.toggleEditBookForm(book.id)}>
              <FaEdit />
            </button>
            <button
              className="button button--item"
              onClick={() => props.deleteBook(book.id)}>
              <FaClose />
            </button>
          </div>
        </li>
      );
    });
  };
  return (
    <div>
      {props.editBookFormOpen &&
        <EditBookForm
          saveEditBook={() => props.saveEditBook()}
          updateEditBookForm={e => props.updateEditBookForm(e)}
          bookToEdit={props.bookToEdit}
          clearEditBookForm={() => props.clearEditBookForm()}
        />}
      <ul className="item--holder">
        {renderList()}
      </ul>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array,
  toggleEditBookForm: PropTypes.func,
  deleteBook: PropTypes.func,
  editBookFormOpen: PropTypes.bool,
  bookToEdit: PropTypes.object,
  saveEditBook: PropTypes.func,
  updateEditBookForm: PropTypes.func,
  clearEditBookForm: PropTypes.func
};

export default BookList;
