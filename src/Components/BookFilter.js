import React from 'react';
import PropTypes from 'prop-types';

const BookFilter = props => {
  const renderOptionsList = () => {
    return props.genres.map(genre => {
      return (
        <option key={genre.id} value={genre.name}>
          {genre.name}
        </option>
      );
    });
  };
  return (
    <div>
      <form className="form" action="">
        <label className="form--label">
          <span className="form--text">Filter by genre:</span>
          <select
            className="form--input"
            onChange={e => props.genreChange(e)}
            value={props.selectedGenre}
            name="filter"
            id="">
            {renderOptionsList()}
          </select>
        </label>
      </form>
    </div>
  );
};

BookFilter.propTypes = {
  genres: PropTypes.array,
  genreChange: PropTypes.func,
  selectedGenre: PropTypes.string
};

export default BookFilter;
