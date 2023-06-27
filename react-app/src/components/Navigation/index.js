import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

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
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
    </nav>
  );
}

export default Navigation;
