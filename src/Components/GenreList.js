import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';
import FaEdit from 'react-icons/lib/fa/edit';
import EditGenreForm from './EditGenreForm';

const GenreList = props => {
  const renderList = () => {
    return props.genres.filter(genre => genre.name !== 'all').map(genre => {
      return (
        <li className="item" key={genre.id}>
          <div className="item--details">
            <p className="item--text">
              <span className="item--field">Name: </span>
              {genre.name}
            </p>
          </div>
          <div className="item--buttons">
            <button
              className="button button--item"
              onClick={() => props.toggleEditGenreForm(genre.id)}>
              <FaEdit />
            </button>
            <button
              className="button button--item"
              onClick={() => props.deleteGenre(genre.id)}>
              <FaClose />
            </button>
          </div>
        </li>
      );
    });
  };
  return (
    <div>
      {props.editGenreFormOpen &&
        <EditGenreForm
          saveEditGenre={() => props.saveEditGenre()}
          updateEditGenreForm={e => props.updateEditGenreForm(e)}
          genreToEdit={props.genreToEdit}
          clearEditGenreForm={() => props.clearEditGenreForm()}
        />}
      <ul className="item--holder">
        {renderList()}
      </ul>
    </div>
  );
};

GenreList.propTypes = {
  genres: PropTypes.array,
  toggleEditGenreForm: PropTypes.func,
  editGenreFormOpen: PropTypes.bool,
  deleteGenre: PropTypes.func,
  genreToEdit: PropTypes.object,
  saveEditGenre: PropTypes.func,
  updateEditGenreForm: PropTypes.func,
  clearEditGenreForm: PropTypes.func
};

export default GenreList;
