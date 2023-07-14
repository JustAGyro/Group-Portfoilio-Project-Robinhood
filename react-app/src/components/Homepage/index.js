import React from 'react';
import './Homepage.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="header-hp">
        <h1>Welcome to Robinhood</h1>
      </div>
      <div className="hp-buttons">
        <button>
          {' '}
          <OpenModalButton
            className="hp-btn"
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </button>
        <button>
          {' '}
          <OpenModalButton
            className="hp-btn"
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </button>
      </div>
      <div className="hp-img-container">
        <img
          src="https://i.ibb.co/SBjFTn9/14-robin-hood.jpg"
          className="rh-img"
          alt="14-robin-hood"
          border="0"
        ></img>
        <img
          src="https://i.ibb.co/HPqzk53/15-little-john.webp"
          className="rh-img"
          alt="15-little-john"
          border="0"
        ></img>
        <img
          src="https://i.ibb.co/L9JGqqv/16-maid-marian.webp"
          className="rh-img"
          alt="16-maid-marian"
          border="0"
        ></img>
        <img
          src="https://i.ibb.co/NWLFJtH/17-friar-tuck.webp"
          className="rh-img"
          alt="17-friar-tuck"
          border="0"
        ></img>
        <img
          src="https://i.ibb.co/LnFfhCm/18-master-will-scarlet.webp"
          className="rh-img"
          alt="18-master-will-scarlet"
          border="0"
        ></img>
        <img
          src="https://i.ibb.co/wsYggng/19-sheriff-of-nottingham.webp"
          className="rh-img"
          alt="19-sheriff-of-nottingham"
          border="0"
        ></img>
      </div>
    </div>
  );
}
