const GET_NOTES = 'notes/GET_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE'


export const addNote = (note) => {
    return {
        type: ADD_NOTE,
        payload: note
    }
}
export const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        payload: notes
    }
}
export const getAllNotes = () => async dispatch => {
    const response = await fetch(`/api/notes/}`);
    if(response.ok){
        const details = await response.json();
        await dispatch(getNotes(details))
        return details
    }
}
export const getNoteByIdThunk = (id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}`);
    if(response.ok){
        const details = await response.json();
        await dispatch(addNote(details))
        return details
    }
}
export const deleteNote = (details) => {
    return {
        type: DELETE_NOTE,
        payload: details
    }
}
export const deleteNoteThunk = (note) => async dispatch => {
    const response = await fetch(`/api/notes/${note.id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    if(response.ok) {
        const details = await response.json();

        dispatch(deleteNote(note.id))
    }
}
export const createNoteThunk = (note) => async dispatch => {
    const response = await fetch(`/api/notes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    if(response.ok) {
        const details = await response.json();
        dispatch(addNote(details))
        return details;
    }
}
export const updateNoteThunk = (note, id) => async dispatch => {
    const response = await fetch(`/api/notes/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    if(response.ok) {
        const details = await response.json();
        dispatch(addNote(details))
        return details;
    }
}

export default function notesReducer(state = {}, action) {
    let newState = {}
    switch(action.type){

        case DELETE_NOTE:
            newState = {...state};
            delete newState[action.payload];
            return newState;
        case ADD_NOTE:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState
        case GET_NOTES:
            newState = {...state};
            action.payload.forEach(note => {
                newState[note.id] = note;
            });
            return newState;
        default:
            return state;
    }
}
