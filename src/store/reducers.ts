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
            return {
                ...state,
                favouriteSeries: state.favouriteSeries.push(action.data)
            }
        default:
            return state;
    }
}

export default reducer;