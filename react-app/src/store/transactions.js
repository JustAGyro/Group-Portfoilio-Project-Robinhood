const GET_TRANSACTION = 'transactions/GET_TRANSACTION';
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
const CLEAR_TRANSACTION = 'transactions/CLEAR_TRANSACTION';

export const getTransactions = (transactions) => {
  return {
    type: GET_TRANSACTION,
    payload: transactions,
  };
};

export const addTransactions = (transaction) => {
  return {
    type: ADD_TRANSACTION,
    payload: transaction,
  };
};

export const clearTransactions = () => {
  return {
    type: CLEAR_TRANSACTION,
  };
};

export const getAllTransactionsThunk = () => async (dispatch) => {
  const response = await fetch('/api/transactions/current');

  if (response.ok) {
    const transactions = await response.json();
    console.log(response);
    await dispatch(getTransactions(transactions));
    return transactions;
  }
};

export const getTransactionsBySymbolThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/symbol/${id}`);

  if (response.ok) {
    const data = await response.json();
    await dispatch(addTransactions(data));
    return data;
  }
};

export const getOneTransactionThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${id}`);

  if (response.ok) {
    const data = await response.json();
    await dispatch(addTransactions(data));
    return data;
  }
};

export const createTransactionThunk = (transaction) => async (dispatch) => {
  const response = await fetch('/api/transactions/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTransactions(data));
    return data;
  }
};

export default function transactionsReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_TRANSACTION:
      newState = { ...state };
      action.payload.forEach((transaction) => {
        newState[transaction.id] = transaction;
      });
      return newState;
    case ADD_TRANSACTION:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case CLEAR_TRANSACTION:
      newState = {};
      return newState;
    default:
      return state;
  }
}
