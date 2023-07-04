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
      <div>
        <NavLink className="navbar-link" exact to="/notes">
          Notes
        </NavLink>
      </div>
      <div>
        <NavLink className="navbar-link" exact to="/notes/new">
          New Note
        </NavLink>
      </div>
      <div>
        <NavLink className="navbar-link" to="/stockapi">
          Stock Graph
        </NavLink>
      </div>
      <div>
        <NavLink className="navbar-link" exact to="/transactions">
          Transactions
        </NavLink>
      </div>
      <div>
        <NavLink className="navbar-link" exact to="/transactions/new">
          New Transaction
        </NavLink>
      </div>
      <div>
        <NavLink className="navbar-link" exact to="/account">
          Account Balance
        </NavLink>
      </div>
      <div className="search-div">
        <SearchBar />
      </div>
      <div>
        <NavLink className="navbar-link" exact to="/watchlists">
          Watchlists
        </NavLink>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
