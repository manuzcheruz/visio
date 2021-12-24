// import { Action } from "redux";
import Series from '../interfaces/series';
import * as actionTypes from './actionTypes';

export interface InitialState {
    selected: any;
    favouriteSeries: Series[];
    randomSeries: Series[];
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
    const actionType: string = action.type;
    switch (actionType) {
        case actionTypes.RANDOM_TV_SERIES:
            let final: Series[] = [];
            const recievedData: Series[] = action.data;
            if (state.favouriteSeries.length) {
                for (let item of recievedData) {
                    if (!state.favouriteSeries.some(el => el.id === item.id)) {
                        final.push(item);
                    }
                }
            } else final = recievedData;
            return {
                ...state,
                randomSeries: final
            }
        case actionTypes.SELECTED_SERIES: 
            const data: Series = action.data;
            return {
                ...state,
                selected: data
            }
        case actionTypes.ADD_TO_FAVOURITES:
            const recievedSeriesDataToAdd: Series = action.data;
            let checkIfPresent = state.favouriteSeries.some(el => el.id === recievedSeriesDataToAdd.id);
            let updated: Series[];
            if (checkIfPresent) {
                updated = [...state.favouriteSeries]; 
            } else updated = [...state.favouriteSeries, recievedSeriesDataToAdd];
            return {
                ...state,
                favouriteSeries: updated
            }
        case actionTypes.REMOVE_FROM_FAVOURITES:
            const recievedFavouriteSeriesData: Series = action.data;
            let updatedAfterFilter: Series[] = state.favouriteSeries.filter(el => el.id !== recievedFavouriteSeriesData.id);
            return {
                ...state,
                favouriteSeries: updatedAfterFilter
            }
        default:
            return state;
    }
}

export default reducer;