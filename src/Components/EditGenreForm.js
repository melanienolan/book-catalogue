import React from 'react';
import PropTypes from 'prop-types';

const EditGenreForm = props => {
  return (
    <div>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          return props.saveEditGenre();
        }}>
        <label className="form--label">
          <span className="form--text">Name: </span>
          <input
            className="form--input"
            onChange={e => props.updateEditGenreForm(e)}
            type="text"
            value={props.genreToEdit.name}
            name="name"
          />
        </label>
        <div className="form--buttons">
          <button
            className="button form--button"
            onClick={e => {
              e.preventDefault();
              return props.clearEditGenreForm();
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

EditGenreForm.propTypes = {
  saveEditGenre: PropTypes.func,
  updateEditGenreForm: PropTypes.func,
  genreToEdit: PropTypes.object,
  clearEditGenreForm: PropTypes.func
};

export default EditGenreForm;
