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
      <div className="bar-home-about">
        <div>
          <NavLink className="navbar-link" exact to="/">
            <GiFeather id="feather-icon" />
          </NavLink>
        </div>
        <div>About</div>
      </div>
      {sessionUser && (
        <div className="search-div">
          <SearchBar />
        </div>
      )}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
