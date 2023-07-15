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

  let watchlists = useSelector((state) => state?.watchlists);
  watchlists = Object.values(watchlists);
  // useEffect(() => {
  //     function handleClickOutside(event) {
  //         if (modalRef.current && !modalRef.current.contains(event.target)) {
  //             // closeModal();
  //         }
  //     }

  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //         document.removeEventListener("click", handleClickOutside);
  //     };
  // }, [closeModal]);
  const submit = async (e) => {
    e.preventDefault();
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
