import React from 'react';
import PropTypes from 'prop-types';

const EditBookForm = props => {
  return (
    <div>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          return props.saveEditBook();
        }}>
        <label className="form--label">
          <span className="form--text">Title: </span>
          <input
            className="form--input"
            onChange={e => props.updateEditBookForm(e)}
            type="text"
            value={props.bookToEdit.title}
            name="title"
          />
        </label>
        <label className="form--label">
          <span className="form--text">Author: </span>
          <input
            className="form--input"
            onChange={e => props.updateEditBookForm(e)}
            type="text"
            value={props.bookToEdit.author}
            name="author"
          />
        </label>
        <label className="form--label">
          <span className="form--text">Price: </span>
          <input
            className="form--input"
            onChange={e => props.updateEditBookForm(e)}
            type="text"
            value={props.bookToEdit.price}
            name="price"
          />
        </label>
        <label className="form--label">
          <span className="form--text">Genre: </span>
          <input
            className="form--input"
            onChange={e => props.updateEditBookForm(e)}
            type="text"
            value={props.bookToEdit.genre}
            name="genre"
          />
        </label>
        <div className="form--buttons">
          <button
            className="button form--button"
            onClick={e => {
              e.preventDefault();
              return props.clearEditBookForm();
            }}>
            Cancel
          </button>
          <button className="button form--button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

EditBookForm.propTypes = {
  saveEditBook: PropTypes.func,
  updateEditBookForm: PropTypes.func,
  bookToEdit: PropTypes.object,
  clearEditBookForm: PropTypes.func
};

export default EditBookForm;
