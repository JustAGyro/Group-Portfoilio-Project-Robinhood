const ADD_STOCK = '/stocks/ADD_STOCK';
const GET_STOCK = '/stocks/GET_STOCK';
const CLEAR_STOCK = '/stocks/CLEAR_STOCK';

export const clearStock = () => {
  return {
    type: CLEAR_STOCK,
  };
};

export const getStock = (symbol) => async (dispatch) => {
  const response = await fetch(`/api/stocks/one_year/${symbol}`);
  if (response.ok) {
    const details = await response.json();

    await dispatch(addStock({ symbol, historical: details }));
    return details;
  }
};
export const getStockCurrent = (symbol) => async (dispatch) => {
  const response = await fetch(`/api/stocks/stock_price/${symbol}`);
  if (response.ok) {
    const details = await response.json();

    return details;
  }
};
export const addStock = (data) => {
  return {
    type: ADD_STOCK,
    payload: data,
  };
};
export const getGainers = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/top_gainers`);
  if (response.ok) {
    const details = await response.json();

    return details;
  }
};

export const GetHistoricalHour = (symbol) => async (dispatch) => {
  const response = await fetch(`/api/stocks/todays/${symbol}`);
  if (response.ok) {
    const details = await response.json();

    return details;
  }
};
export default function stockReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case ADD_STOCK:
      newState = { ...state };
      newState[action.payload.symbol] = action.payload.historical
        ?.map((ele) => {
          let thing = {
            time: ele.date,
            value: ele.close,
          };
          return thing;
        })
        .reverse();
      return newState;
    case CLEAR_STOCK:
      return {};
    default:
      return state;
  }
}
