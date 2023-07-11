import React, { useEffect, useState } from "react";
import { getAllNotes, getNoteByIdThunk, updateNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './ListNotes.css'

export default function ListNotes() {
    const dispatch = useDispatch();
    let notesData = useSelector(state => state?.notes)
    let notes = Object.values(notesData);
    // notes = Object.values(notes).map(obj => {
    //     return Object.values(obj)
    // })
    // notes.forEach(element => {
    //     element[3] = Object.values(element[3]).map(element => {
    //         return Object.values(element)
    //     })
    // });


    useEffect(() => {
        dispatch(getAllNotes())
        console.log(notes)
    },[])
    return (
        <div>
            {notes.map(ele => {
                return (
                    <div className="note">
                        <div className="note-subject">
                            {ele.subject}
                        </div>
                        <div className="note-entry">
                            {ele.entry}
                        </div>
                        <div className="note-symbols">
                            {Object.values(ele.symbols.map(ele => ele.symbol))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
