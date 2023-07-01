import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav class="bar">
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/notes">
          Notes
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/notes/new">
          New Note
        </NavLink>
      </div>
      <div>
        <NavLink to="/stockapi">Stock Graph</NavLink>
      </div>
      <div>
        <NavLink exact to="/transactions">
          Transactions
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/transactions/new">
          New Transaction
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/account">
          Account Balance
        </NavLink>
      </div>
      <div className="search-div">
        <SearchBar />
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
