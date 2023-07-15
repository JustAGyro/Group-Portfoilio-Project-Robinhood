import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './BuyModal.css';
import { useModal } from '../../context/Modal';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { createTransactionThunk } from '../../store/transactions';
import { updateAccountInfo, getAccountInfo } from '../../store/account';

export default function BuyModal({ symbol, price }) {
  const { closeModal } = useModal();
  const [quantity, setQuantity] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const acctBalance = useSelector((state) => state.account.info.balance);
  const userId = useSelector((state) => state.session.user.id);
  const [pendingTransaction, setPendingTransaction] = useState(0);
  const [transClass, setTransClass] = useState('modal-p-tag-trans-good');
  let formattedBalance;

  if (acctBalance) {
    formattedBalance = acctBalance.toLocaleString();
  }

  const handleQuantityChange = (event) => {
    const input = event.target.value;
    const newQuantity = input === '' ? 0 : parseInt(input);
    if (Number.isInteger(newQuantity)) {
      setQuantity(newQuantity);
      setPendingTransaction(newQuantity * price);
    }
    setQuantityError(false);
    setDisabled(false);
    setValidationError(false);
  };

  useEffect(() => {
    if (pendingTransaction > acctBalance) {
      setTransClass('modal-p-tag-trans-bad');
    } else if (pendingTransaction < acctBalance) {
      setTransClass('modal-p-tag-trans-good');
    }
  }, [quantity]);

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const transactionAmount = quantity * price;
    if (transactionAmount > acctBalance) {
      // If transaction amount exceeds purchasing power
      setValidationError(true);
      return;
    }

    if (quantity < 1) {
      setQuantityError(true);
      setDisabled(true);
      return;
    }

    const payload = {
      transaction: 'buy',
      quantity: quantity,
      price: price,
      symbol: symbol,
    };

    // Send the payload to the backend route '/api/transactions/new'

    const newBalance = acctBalance - transactionAmount;
    const balancePayload = {
      balance: newBalance,
    };
    dispatch(createTransactionThunk(payload));
    dispatch(updateAccountInfo(userId, balancePayload));

    closeModal();
  };

  return (
    <div className="buy-modal-div">
      <div className="buy-modal-form-container">
        <button className="close-button" onClick={closeModal}>
          <GrClose id="close-button-icon" />
        </button>
        <h2>Buy {symbol}</h2>
        <p className="modal-p-tag">Purchasing Power: $ {formattedBalance} </p>
        <p className="modal-p-tag">Stock Price: $ {price} </p>
        {pendingTransaction > 0 && (
          <p className={transClass}>
            Transaction amount: $ {pendingTransaction.toLocaleString()}
          </p>
        )}
        <form className="form-modal" onSubmit={handleSubmit}>
          <label>Quantity: </label>
          <input className="buy-sell-input" type="number" min="0"></input>
          {validationError && (
            <p className="validation-error">
              Transaction exceeds purchasing power, choose a smaller quantity.
            </p>
          )}
          {quantityError && (
            <p className="validation-error">Quantity must be greater than 0</p>
          )}
          <button
            className="buy-submit-button-modal"
            type="submit"
            disabled={disabled}
          >
            Buy
          </button>
        </form>
      </div>
    </div>
  );
}
