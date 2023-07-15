const GET_NOTES = 'notes/GET_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';
const GET_NOTESYMBOLS = 'note/GET_NOTESYMBOLS'
const ADD_NOTESYMBOL = 'notes/ADD_NOTESYMBOL';
const EDIT_NOTESYMBOL = 'notes/EDIT_NOTESYMBOL'
const DELETE_NOTESYMBOL = 'notes/DELETE_';
const CLEAR_NOTES = 'notes/CLEAR'
export const clearNotes = () =>{
  return {
    type: CLEAR_NOTES
  }
}
export const addNote = (note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};
export const getNotes = (notes) => {
  return {
    type: GET_NOTES,
    payload: notes,
  };
};
export const getNoteSymbols = (noteId, notesymbols) => {
  return {
    type: GET_NOTESYMBOLS,
    payload: {
      noteId,
      notesymbols
    }
  }
}
export const addNoteSymbol = (noteId, notesymbol) => {
  return {
    type: ADD_NOTESYMBOL,
    payload: {
      noteId,
      notesymbol
    }
  }
}
export const editNoteSymbol = (noteId, notesymbolId, notesymbol) => {
  return {
    type: EDIT_NOTESYMBOL,
    payload: {
      noteId, notesymbolId, notesymbol
    }
  }
}
export const deleteNoteSymbol = (noteId, notesymbolId) => {
  return {
    type: DELETE_NOTESYMBOL,
    payload: {
      noteId,
      notesymbolId
    }
  }
}
export const getAllNotes = () => async (dispatch) => {
  const response = await fetch(`/api/notes/current`);
  if (response.ok) {
    const details = await response.json();

    await dispatch(getNotes(details));
    return details;
  }
};
export const getNoteByIdThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`);
  if (response.ok) {
    const details = await response.json();
    await dispatch(addNote(details));
    return details;
  }
};
export const deleteNote = (details) => {
  return {
    type: DELETE_NOTE,
    payload: details,
  };
};
export const deleteNoteThunk = (note) => async (dispatch) => {
  const response = await fetch(`/api/notes/${note.id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const details = await response.json();

    dispatch(deleteNote(note));
  }
};
export const createNoteThunk = (note) => async (dispatch) => {

  const response = await fetch(`/api/notes/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const details = await response.json();
    dispatch(addNote(details));
    return details;
  }
};
export const updateNoteThunk = (note, id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const details = await response.json();
    dispatch(addNote(details));
    return details;
  }
};
export const getAllNoteSymbols = (id) => async (dispatch) => {
  const response = await fetch (`/api/notes/${id}/notesymbols`);
  if (response.ok) {
    const details = await response.json()
    await dispatch(getNoteSymbols(details))
  }
}
export const createNoteSymbolThunk = (noteId, notesymbol) => async (dispatch) => {
  const response = await fetch(
    `/api/notes/${noteId}/notesymbol/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symbol: notesymbol })
  }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(addNoteSymbol(noteId, data));
    return data
  }
}
export const editNoteSymbolThunk = (noteId, notesymbolId, notesymbol) => async (dispatch) => {
  const response = await fetch (`/api/notes/${noteId}/notesymbol/${notesymbolId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({symbol: notesymbol})
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(editNoteSymbol(noteId, notesymbolId, data))
    return data
  }
}

export const deleteNoteSymbolThunk = (
  noteId, notesymbolId
) => async (dispatch) => {
  const response = await fetch(
    `/api/notes/${noteId}/notesymbol/${notesymbolId}/delete `, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  )
  if (response.ok) {
    dispatch(deleteNoteSymbol(noteId, notesymbolId));
    return true
  }
  return false
}

export default function notesReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    case ADD_NOTE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case GET_NOTES:
      newState = { ...state };
      action.payload.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    case GET_NOTESYMBOLS:
      newState = { ...state };
      const {noteId1, notesymbols} = action.payload;
      newState[noteId1] = {
        ...newState[noteId1],
        symbollist:notesymbols
      }

    case ADD_NOTESYMBOL:
      newState = { ...state };
      const { noteId, notesymbol } = action.payload;
      newState[noteId] = {
        ...newState[noteId],
        symbollist: [...newState[noteId].symbollist, notesymbol],
      };
      return newState
    case EDIT_NOTESYMBOL:
      newState = { ...state }
      const {noteId2, notesymbolId1, notesymbol1} = action.payload;
      newState[noteId2].symbollist[notesymbolId1] = notesymbol1
      return newState
    case DELETE_NOTESYMBOL:
      newState = { ...state };
      const { noteeId, notesymbolId } = action.payload
      if (newState[noteeId]) {
        newState[noteeId].symbollist.filter(
          (symbollist) => symbollist.id !== notesymbolId
        )
      }
      return newState
    case CLEAR_NOTES:
      return {}
    default:
      return state;
  }
}
