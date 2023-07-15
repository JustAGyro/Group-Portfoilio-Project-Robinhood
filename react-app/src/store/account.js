const GET_ACCOUNT = 'accounts/GET_ACCOUNT'
const ADD_ACCOUNT = 'accounts/ADD_ACCOUNT'

export const getAccount = (account) => {
    return {
        type: GET_ACCOUNT,
        payload: account
    }
}

export const addAccount = (account) => {
    return {
        type: ADD_ACCOUNT,
        payload: account
    }
}

export const createAccount = (userId) => async dispatch => {
    const response = await fetch(`/api/accounts/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const details = await response.json()
        await dispatch(addAccount(details))
        return details
    }
}
export const getAccountInfo = () => async dispatch => {
    const response = await fetch('/api/accounts/info');

    if (response.ok) {
        const details = await response.json();
        await dispatch(getAccount(details))
        return details
    }
}
export const updateAccountInfo = (id, account) => async dispatch => {
    const response = await fetch(`/api/accounts/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    });

    if (response.ok) {
        const details = await response.json()
        await dispatch(addAccount(details))
        return details
    }
}


export default function accountReducer(state={}, action) {
    let newState = {}
    switch(action.type) {
        case GET_ACCOUNT:
            return {info: action.payload}
        case ADD_ACCOUNT:
            newState = {...state};
            newState['info'] = action.payload
            return newState
        default:
            return state

    }
}
