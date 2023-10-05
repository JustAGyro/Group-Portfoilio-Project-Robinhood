import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { GiFeather } from 'react-icons/gi';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="bar">
      <div>
        <NavLink className="navbar-link" exact to="/">
          <GiFeather id="feather-icon" />
        </NavLink>
      </div>

      {sessionUser && (
        <div className="search-div">
          <SearchBar />
        </div>
      )}
      <div className="bar-home-about">
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
        <div>
          <NavLink className="navbar-link" exact to="/about">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
