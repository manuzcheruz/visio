// import { Action } from "redux";
import * as actionTypes from './actionTypes';

interface InitialState {
    selected: any;
    favouriteSeries: any[];
    randomSeries: any[];
}

const initialStore: InitialState = {
    selected: {},
    favouriteSeries: [],
    randomSeries: []
}

const reducer = (state = initialStore, action: any) => {
    switch (action.type) {
        case actionTypes.RANDOM_TV_SERIES:
            //filter out the favourite series here first
            let final: any[] = [];
            if (state.favouriteSeries.length >= 1) {
                for (let item of state.favouriteSeries) {
                    // console.log(item);
                    final = action.data.filter((el: any) => el.id !== item.id);
                    // console.log(final.length);
                }
            } else final = action.data
            return {
                ...state,
                randomSeries: final
            }
        case actionTypes.SELECTED_SEARCH_RESULT: 
            return {
                ...state,
                selected: action.data
            }
        case actionTypes.ADD_TO_FAVOURITES:
            let checker = state.favouriteSeries.some(el => el.id === action.data.id);
            let updated: any[];
            if (checker) {
                updated = [...state.favouriteSeries]; 
            } else updated = [...state.favouriteSeries, action.data];
            return {
                ...state,
                favouriteSeries: updated
            }
        case actionTypes.REMOVE_FROM_FAVOURITES:
            let updatedAfterFilter = state.favouriteSeries.filter(el => el.id !== action.data.id);
            return {
                ...state,
                favouriteSeries: updatedAfterFilter
            }
        default:
            return state;
    }
}

export default reducer;