import React from 'react';
import './BuyModal.css';
import { useModal } from '../../context/Modal';
import { GrClose } from 'react-icons/gr';

export default function BuyModal({ symbol }) {
  const { closeModal } = useModal();

  return (
    <div className="buy-modal-div">
      <div className="buy-modal-form-container">
        <button className="close-button" onClick={closeModal}>
          <GrClose id="close-button-icon" />
        </button>
        <p>Buy {symbol}</p>
        <form>
          <label>Quantity: </label>
          <input className="buy-sell-input"></input>
        </form>
      </div>
    </div>
  );
}
