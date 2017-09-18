import React from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus';

const GenreForm = props => {
  return (
    <div>
      {!props.genreFormOpen &&
        <button className="button button--add" onClick={() => props.toggleGenreForm()}>
          <FaPlus /> Add genre
        </button>}
      {props.genreFormOpen &&
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            return props.saveGenre();
          }}>
          <label className="form--label">
            <span className="form--text">Name: </span>
            <input
              className="form--input"
              type="text"
              onChange={e => props.updateGenreForm(e)}
              value={props.genreForm.name}
              name="name"
            />
          </label>
          <div className="form--buttons">
            <button
              className="button form--button"
              onClick={e => {
                e.preventDefault();
                return props.clearGenreForm();
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

GenreForm.propTypes = {
  genreFormOpen: PropTypes.bool,
  toggleGenreForm: PropTypes.func,
  saveGenre: PropTypes.func,
  updateGenreForm: PropTypes.func,
  genreForm: PropTypes.object,
  clearGenreForm: PropTypes.func
};

export default GenreForm;
