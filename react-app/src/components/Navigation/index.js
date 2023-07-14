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
    <nav class="bar">
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
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
