import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { clearTransactions } from '../../store/transactions';
import { clearNotes } from '../../store/notes';
import { clearWatchlists } from '../../store/watchlist';
import { clearAccount } from '../../store/account';
import { clearStock } from '../../store/stocks';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearNotes());
    dispatch(clearTransactions());
    dispatch(clearWatchlists());
    dispatch(clearAccount());
    dispatch(clearStock());

    dispatch(logout());

    history.push('/');
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button className="account-button" onClick={openMenu}>
        <MdOutlineAccountCircle id="account-icon" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <button className="sd-button-drop-down">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </button>
            <button className="sd-button-drop-down">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
