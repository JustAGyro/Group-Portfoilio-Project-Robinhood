import React, { useEffect, useState } from "react";
import { getAllNotes, getNoteByIdThunk, updateNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ListNotes() {
    const dispatch = useDispatch();
    let notes = useSelector(state => state?.notes)
    notes = Object.values(notes).map(obj => {
        return Object.values(obj)
    })
    notes.forEach(element => {
        element[3] = Object.values(element[3]).map(element => {
            return Object.values(element)
        })
    });


    useEffect(() => {
        dispatch(getAllNotes())
    },[])
    return (
        <div>
            {notes.map(arr => {
                return (
                    <div>
                        {`${arr}`}
                    </div>
                )
            })}
        </div>
    )
}
