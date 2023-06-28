const ADD_STOCK = "/stocks/ADD_STOCK";

export const addStock = (data) => {
    return {
        type: ADD_STOCK,
        payload: data
    }
}
export default function stockReducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case ADD_STOCK:
            newState[action.payload.symbol] = action.payload.historical;
            return newState
        default:
            return state
    }
}
