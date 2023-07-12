import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotesThunk, createNoteThunk, updateNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

export default function NewNoteModal () {
    const dispatch = useDispatch();
    const history = useHistory()
    const [subject, setSubject] = useState("");
    const [entry, setEntry] = useState("");
    const [note, setNote] = useState({subject, entry})
    const { closeModal } = useModal();

    useEffect(() => {
        setNote({subject, entry})
    },[subject, entry])
    const submit = async (e) => {
        e.preventDefault();
        if(subject && entry){
            await dispatch(createNoteThunk(note));
            closeModal();
        }
    }
    return (
        <div className="modal-box">
            <form onSubmit={submit} method="POST" action={`/api/notes/new`}>
                <div>
                    <div>
                        Subject
                    </div>
                    <label>
                        <input
                        name="subject"
                        type="text"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                        />
                    </label>
                </div>
                <div>
                    <div>
                        Entry
                    </div>
                    <label>
                        <input
                        name="entry"
                        type="text"
                        onChange={e => setEntry(e.target.value)}
                        value={entry}
                        />
                    </label>

                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={closeModal}>cancel</button>
                </div>
            </form>
        </div>
    )
}
export function EditNoteModal (props) {
    const dispatch = useDispatch();
    const history = useHistory()
    const noteX = props.note
    const [subject, setSubject] = useState("");
    const [entry, setEntry] = useState("");
    const [note, setNote] = useState({subject, entry})
    const { closeModal } = useModal();
    useEffect(() => {
        setSubject(noteX.subject)
        setEntry(noteX.entry)
    },[noteX])
    useEffect(() => {
        setNote({subject, entry})
    },[subject, entry])
    const submit = async (e) => {
        e.preventDefault();
        if(subject && entry){
            await dispatch(updateNoteThunk(note, noteX.id));
            closeModal();
        }
    }
    return (
        <div>
            <form onSubmit={submit} method="POST" action={`/api/notes/new`}>
                <div>
                    <div>
                        Subject
                    </div>
                    <label>
                        <input
                        name="subject"
                        type="text"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                        />
                    </label>
                </div>
                <div>
                    <div>
                        Entry
                    </div>
                    <label>
                        <input
                        name="entry"
                        type="text"
                        onChange={e => setEntry(e.target.value)}
                        value={entry}
                        />
                    </label>

                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button onClick={closeModal}>cancel</button>
                </div>
            </form>
        </div>
    )
}
