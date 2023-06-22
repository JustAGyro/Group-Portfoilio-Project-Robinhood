import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotesThunk, createNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";

export default function NewNote () {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState("");
    const [entry, setEntry] = useState("");
    const [note, setNote] = useState({subject, entry})

    useEffect(() => {
        setNote({subject, entry})
    },[subject, entry])
    const submit = async (e) => {
        e.preventDefault();
        if(subject && entry) await dispatch(createNoteThunk(note));
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
                </div>
            </form>
        </div>
    )
}
