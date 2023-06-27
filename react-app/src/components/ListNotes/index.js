import React, { useEffect, useState } from "react";
import { getAllNotes, getNoteByIdThunk, updateNoteThunk } from "../../store/notes"
import { useHistory, useParams } from "react-router-dom";

export default function ListNotes() {

    const response = fetch(`/api/notes/mine`).then(res => res.json()).then(res => console.log(res))

    return (
        <div>
            yesss
        </div>
    )
}
