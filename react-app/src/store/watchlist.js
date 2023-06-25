const GET_WATCHLIST = 'watchlist/GET_WATCHLIST';
const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';
const ADD_SYMBOLLIST = 'watchlist/ADD_SYMBOLLIST';
const DELETE_SYMBOLLIST = 'watchlist/DELETE_SYMBOLLIST';

export const getAllWatchlists = (watchlists) => {
  return {
    type: GET_WATCHLIST,
    payload: watchlists,
  };
};

export const addWatchlists = (watchlist) => {
  return {
    type: ADD_WATCHLIST,
    payload: watchlist,
  };
};

export const deleteWatchlist = (watchlist) => {
  return {
    type: DELETE_WATCHLIST,
    payload: watchlist,
  };
};

export const addSymbollist = (watchlistId, symbollist) => {
  return {
    type: ADD_SYMBOLLIST,
    payload: {
      watchlistId,
      symbollist,
    },
  };
};

export const getAllWatchlistsThunk = () => async (dispatch) => {
  const response = await fetch('/api/watchlists/current');

  if (response.ok) {
    const watchlists = await response.json();
    await dispatch(getAllWatchlists(watchlists));
    return watchlists;
  }
};

export const getOneWatchlistThunk = (id) => async (dispatch) => {
  const response = await fetch(`api/watchlists/${id}`);

  if (response.ok) {
    const data = await response.json();
    await dispatch(addWatchlists(data));
    return data;
  }
};

export const createWatchlistThunk = (watchlist) => async (dispatch) => {
  const response = await fetch('/api/watchlists/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(watchlist),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addWatchlists(data));
    return data;
  }
};

export const deleteWatchlistThunk = (watchlist) => async (dispatch) => {
  const reposne = await fetch(`/api/watchlists/delete/${watchlist.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(watchlist),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteWatchlist(watchlist.id));
  }
};

export default function watchlistsReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_WATCHLIST:
      newState = { ...state };
      action.payload.forEach((watchlist) => {
        newState[watchlist.id] = watchlist;
      });
      return newState;
    case ADD_WATCHLIST:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_WATCHLIST:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
