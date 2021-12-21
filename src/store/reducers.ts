// import { Action } from "redux";
import * as actionTypes from './actionTypes';

interface InitialState {
    selected: any;
    favouriteSeries: any[]
}

const initialStore: InitialState = {
    selected: {},
    favouriteSeries: []
}

const reducer = (state = initialStore, action: any) => {
    switch (action.type) {
        case actionTypes.SELECTED_SEARCH_RESULT: 
            return {
                ...state,
                selected: action.data
            }
        case actionTypes.ADD_TO_FAVOURITES:
            let updated: any[];
            if (action.data.status) {
                updated = [...state.favouriteSeries, action.data.item]; //add
            } else {
                updated = state.favouriteSeries.filter(el => el !== action.data.item); //remove
            }
            return {
                ...state,
                favouriteSeries: updated
            }
        default:
            return state;
    }
}

export default reducer;