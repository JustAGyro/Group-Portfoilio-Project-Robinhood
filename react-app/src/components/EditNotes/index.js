import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotesThunk, updateNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";

export default EditNote = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const oldNote = useSelector(state => state.notes[id]);
    const [subject, setSubject] = useState(oldNote.subject);
    const [entry, setEntry] = useState(oldNote.entry);
    const [note, setNote] = useState({subject, entry})

    useEffect(() => {
        dispatch(getNotesThunk(id))
    })

    const submit = async (e) => {
        e.preventDefault();
        if(subject && entry) {
            setNote({subject, entry})
            await dispatch(updateNoteThunk(note, id));
        }
    }
    return (
        <div>
            <form onSubmit={submit} method="PUT" action={`/api/notes/${id}`}>
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
                </div>
            </form>
        </div>
    )
}
