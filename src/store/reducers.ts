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
            let updated = [...state.favouriteSeries, action.data]; 
            return {
                ...state,
                favouriteSeries: updated
            }

        case actionTypes.REMOVE_FROM_FAVOURITES:
            let updatedAfterFilter = state.favouriteSeries.filter(el => el !== action.data);
            return {
                ...state,
                favouriteSeries: updatedAfterFilter
            }
        default:
            return state;
    }
}

export default reducer;