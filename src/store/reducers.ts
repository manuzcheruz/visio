// import { Action } from "redux";
import * as actionTypes from './actionTypes';

const initialStore = {
    selected: {}
}

const reducer = (state = initialStore, action: any) => {
    switch (action.type) {
        case actionTypes.SELECTED_SEARCH_RESULT: 
            return {
                ...state,
                selected: action.data
            }
        default:
            return state;
    }
}

export default reducer;