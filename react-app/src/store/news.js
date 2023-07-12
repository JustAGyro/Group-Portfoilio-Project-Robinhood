const ADD_NEWS = "/news/ADD_NEWS"
const GET_NEWS = "/news/GET_NEWS"

export const addNews = (news) => {
    return {
        type: ADD_NEWS,
        payload: news
    }
}

export const getFiveArticlesBySymbol = symbol => async dispatch => {
    const response = await fetch(`/api/stocks/stock_news/${symbol}`);
    if(response.ok){
        const details = await response.json();
        details.forEach(async ele => {
            await dispatch(addNews(ele))
        });
        return details;
    }
}
export const getGeneralNews = () => async dispatch => {
    const response = await fetch(`/api/stocks/general_news`);
    if(response.ok){
        const details = await response.json();
        details.forEach(async ele => {
            await dispatch(addNews(ele))
        });
        return details;
    }
}

export const getTargetedNews = route => async dispatch => {
    const response = await fetch(`/api/stocks${route}`);
    if(response.ok){
        const details = await response.json();
        details.forEach(async ele => {
            await dispatch(addNews(ele))
        });
        return details;
    }
}



export default function newsReducer( state = {general: {}}, action){
    let newState = {};
    switch (action.type){
        case ADD_NEWS:
            newState = {...state};
            if(action.payload.symbol){
                newState[action.payload.symbol] = {...state[action.payload.symbol]};
                Object.assign(newState[action.payload.symbol][action.payload.title], action.payload);
                return newState;
            }
            else{
                let title = action.payload.title;
                newState['general'] = {
                    ...state.general,
                    [title]: action.payload
                }
                return newState
            }
        default:
            return state;
    }
}
