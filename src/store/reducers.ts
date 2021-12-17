import { Action } from "redux";
import * as actionTypes from './actionTypes';

const initialStore = {
    selected: []
}

const reducer = (state = initialStore, action: Action) => {
    switch (action.type) {
        case actionTypes.SELECTED_SEARCH_RESULT: 
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;