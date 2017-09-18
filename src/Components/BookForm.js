import React from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus';

const BookForm = props => {
  return (
    <div>
      {!props.bookFormOpen &&
        <button className="button button--add" onClick={() => props.toggleBookForm()}>
          <FaPlus /> Add Book
        </button>}
      {props.bookFormOpen &&
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            return props.saveBook();
          }}>
          <label className="form--label">
            <span className="form--text">Title: </span>
            <input
              className="form--input"
              onChange={e => props.updateBookForm(e)}
              type="text"
              value={props.bookForm.title}
              name="title"
            />
          </label>
          <label className="form--label">
            <span className="form--text">Author: </span>
            <input
              className="form--input"
              onChange={e => props.updateBookForm(e)}
              type="text"
              value={props.bookForm.author}
              name="author"
            />
          </label>
          <label className="form--label">
            <span className="form--text">Price: </span>
            <input
              className="form--input"
              onChange={e => props.updateBookForm(e)}
              type="text"
              value={props.bookForm.price}
              name="price"
            />
          </label>
          <label className="form--label">
            <span className="form--text">Genre: </span>
            <input
              className="form--input"
              onChange={e => props.updateBookForm(e)}
              type="text"
              value={props.bookForm.genre}
              name="genre"
            />
          </label>
          <div className="form--buttons">
            <button
              className="button form--button"
              onClick={e => {
                e.preventDefault();
                return props.clearBookForm();
              }}>
              Cancel
            </button>
            <button className="button form--button" type="submit">
              Save
            </button>
          </div>
        </form>}
    </div>
  );
};

BookForm.propTypes = {
  bookFormOpen: PropTypes.bool,
  toggleBookForm: PropTypes.func,
  saveBook: PropTypes.func,
  updateBookForm: PropTypes.func,
  bookForm: PropTypes.object,
  clearBookForm: PropTypes.func
};

export default BookForm;
