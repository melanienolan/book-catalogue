import React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

const Menu = props => {
  let booksOpen = props.route === 'books';
  return (
    <div className="menu--holder">
      <div className="logo--holder">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <nav className="menu">
        <button
          className={
            booksOpen ? 'button button--tab button--tab-selected' : 'button button--tab'
          }
          onClick={() => props.onMenuClick('books')}>
          Books
        </button>
        <button
          className={
            booksOpen ? 'button button--tab' : 'button button--tab button--tab-selected'
          }
          onClick={() => props.onMenuClick('genres')}>
          Genres
        </button>
      </nav>
    </div>
  );
};

Menu.propTypes = {
  route: PropTypes.string,
  onMenuClick: PropTypes.func
};

export default Menu;
