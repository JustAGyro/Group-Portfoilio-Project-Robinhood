import React, { useEffect, useState } from 'react';
import {
  deleteNoteThunk,
  createNoteThunk,
  getAllNotes,
  getNoteByIdThunk,
  updateNoteThunk,
} from '../../store/notes';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ListNotes.css';
import NewNoteModal, { EditNoteModal } from '../NewNotes';
import OpenModalButton from '../OpenModalButton';
import { useModal } from '../../context/Modal';

export default function ListNotes() {
  const dispatch = useDispatch();
  let notesData = useSelector((state) => state?.notes);
  let notes = Object.values(notesData);
  const deleteNote = (note) => {
    dispatch(deleteNoteThunk(note));
  };

  useEffect(() => {
    dispatch(getAllNotes());
    console.log(notes);
  }, []);
  return (
    <div>
      <div className="add-note">
        <OpenModalButton
          buttonText="Add Note"
          modalComponent={<NewNoteModal action={createNoteThunk} />}
        />
      </div>
      {notes.map((ele) => {
        return (
          <div className="note">
            <div className="note-options">
              <div className="delete-note">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteNoteModal action={deleteNoteThunk} target={ele} />
                  }
                />
              </div>
              <div className="edit-note">
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={<EditNoteModal note={ele} />}
                />
              </div>
            </div>
            <div className="note-subject">Subject: {ele.subject}</div>
            <div className="note-entry">{ele.entry}</div>
            <div className="note-symbols">
              <h4 className="related-stocks-h4">Related stocks:</h4>
              {Object.values(ele.symbols.map((ele) => ele.symbol))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export const DeleteNoteModal = (props) => {
  const { action, target } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async () => {
    console.log(target);
    dispatch(action(target));
    closeModal();
  };
  return (
    <div className="deletemain">
      <h3>Are you sure you want to delete?</h3>
      <div className="deletemain-buttons">
        <button id="yesbutton" onClick={() => handleSubmit()}>
          YES
        </button>
        <button id="nobutton" onClick={() => closeModal()}>
          NO
        </button>
      </div>
    </div>
  );
};
