import React, { useState, useEffect, useRef } from 'react';
import './showlistmodal.css';
import {
  createWatchlistThunk,
  getAllWatchlists,
} from '../../../store/watchlist';
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
export default function WatchListModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // useEffect(() => {
  //   if (name.length > 15 || name.length < 1) {
  //     setNameError(true);
  //     setDisabled(true);
  //   } else {
  //     setNameError(false);
  //     setDisabled(false);
  //   }
  // }, [name]);

  const submit = async (e) => {
    e.preventDefault();
    if (name.length > 15 || name.length < 1) {
      setNameError(true)

      return 
    }
    if (name)
    setDisabled(true)
      await dispatch(
        createWatchlistThunk({
          name: name,
        })
      );
    // dispatch()
    closeModal();
  };
  return (
    <div id="cre-wat-lst-modalContainer">
      <div className="cre-wat-mod-hed">
        <p>Create List</p>
        <button onClick={() => closeModal()} className="cre-wat-mod-hed-can">
          {' '}
          X{' '}
        </button>
      </div>
      <div>
        <form onSubmit={submit} method="POST" action="/api/watchlists/new">
          <div className="wat-lst-cre-mod-bod">
            <input
              placeholder="List Name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {nameError && (
            <p className="name-error">
              Name must be between 1 and 15 characters
            </p>
          )}
          <div className="cre-wat-lst-mod-btns">
            <button
              onClick={() => closeModal()}
              className="cre-lst-mod-cancel-btn"
            >
              Cancel
            </button>
            <button
              disabled={disabled}
              className="cre-lst-mod-btn"
              type="submit"
            >
              Create List
            </button>
          </div>
        </form>
      </div>
      <div className="cre-wat-mod-footer">
        {/* <button>Create List</button> */}
      </div>
    </div>
  );
}
