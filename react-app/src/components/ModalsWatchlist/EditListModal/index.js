import React, { useState, useEffect, useRef } from 'react';
import './editlistmodal.css';
import { useModal } from '../../../context/Modal';
import {
  createWatchlistThunk,
  editListThunk,
  getAllWatchlists,
} from '../../../store/watchlist';
import { useDispatch, useSelector } from 'react-redux';
export default function EditListName({ id, name }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const modalRef = useRef(null);
  const [listName, setListName] = useState(name);
  const [nameError, setNameError] = useState(false);
  // const [disabled, setDisabled] = useState(false);

  let watchlists = useSelector((state) => state?.watchlists);
  watchlists = Object.values(watchlists);
  

  // useEffect(() => {
  //   if (listName.length > 15 || listName.length < 1) {
  //     setNameError(true);
  //     setDisabled(true);
  //   } else {
  //     setNameError(false);
  //     setDisabled(false);
  //   }
  // }, [listName]);
  const submit = async (e) => {
    e.preventDefault();
    if (listName.length > 15 || listName.length < 1) {
      setNameError(true)
      return 
    }
    if (listName)
      await dispatch(
        editListThunk(id, {
          name: listName,
        })
      );
    // dispatch()
    closeModal();
  };
  return (
    <div id="wat-lst-modalContainer-edit">
      <div className="wat-lst-edit-title">
        <p>Edit List</p>
        <button className="wat-lst-edit-cancel" onClick={closeModal}>
          {' '}
          X{' '}
        </button>
      </div>
      <div className="wat-lst-edit-form">
        <form
          onSubmit={submit}
          method="PUT"
          action={`/api/watchlists/${id}/edit`}
        >
          {nameError && (
            <p className="name-error">
              Name must be between 1 and 15 characters
            </p>
          )}
          <div className="wat-lst-edit-form-body">
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />

            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
