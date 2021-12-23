// import { Action } from "redux";
import Series from '../interfaces/series';
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

/**
 * manages events relating to state
 * @param state 
 * @param action 
 * @returns 
 */
const reducer = (state = initialStore, action: any) => {
    switch (action.type) {
        case actionTypes.RANDOM_TV_SERIES:
            let final: Series[] = [];
            if (state.favouriteSeries.length >= 1) {
                for (let item of state.favouriteSeries) {
                    final = action.data.filter((el: any) => el.id !== item.id);
                }
            } else final = action.data;
            return {
                ...state,
                randomSeries: final
            }
        case actionTypes.SELECTED_SEARCH_RESULT: 
            const data: Series = action.data;
            return {
                ...state,
                selected: data
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