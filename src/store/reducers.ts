import Series from '../interfaces/series';
import { Action } from './actions';
import { ActionTypes } from './actionTypes';

export interface InitialState {
    selected: Series | null;
    favouriteSeries: Series[];
    randomSeries: Series[];
    searchTerms: string[];
}

const initialStore: InitialState = {
    selected: null,
    favouriteSeries: [],
    randomSeries: [],
    searchTerms: []
}

/**
 * manages events relating to state
 * @param state 
 * @param action 
 * @returns 
 */
const reducer = (state = initialStore, action: Action) => {
    switch (action.type) {
        case ActionTypes.RANDOM_TV_SERIES:
            let final: Series[] = [];
            const recievedData = action.data;
            if (state.favouriteSeries.length) {
                recievedData.map(item => {
                    if (!state.favouriteSeries.some(el => el.id === item.id)) {
                        return final.push(item);
                    }
                });
            } else final = recievedData;
            return {
                ...state,
                randomSeries: final
            }
        case ActionTypes.SELECTED_SERIES: 
            const data = action.data;
            return {
                ...state,
                selected: data
            }
        case ActionTypes.ADD_TO_FAVOURITES:
            const recievedSeriesDataToAdd = action.data;
            let checkIfPresent = state.favouriteSeries.some(el => el.id === recievedSeriesDataToAdd.id);
            let updated: Series[];
            if (checkIfPresent) {
                updated = [...state.favouriteSeries];
            } else updated = [...state.favouriteSeries, recievedSeriesDataToAdd];
            return {
                ...state,
                favouriteSeries: updated
            }
        case ActionTypes.REMOVE_FROM_FAVOURITES:
            const recievedFavouriteSeriesData = action.data;
            let updatedAfterFilter: Series[] = state.favouriteSeries.filter(el => el.id !== recievedFavouriteSeriesData.id);
            return {
                ...state,
                favouriteSeries: updatedAfterFilter
            }
        case ActionTypes.UPDATE_FAVOURITE_SERIES:
            const updatedFavouriteSeries: Series[] = [];
            state.favouriteSeries.map(item => {
                let updatedItem: Series;
                if (action.data[item.id]) {
                    updatedItem = Object.assign(item, action.data[item.id]);
                } else {
                    updatedItem = item;
                }
                return updatedFavouriteSeries.push(updatedItem);
            });
            return {
                ...state,
                favouriteSeries: updatedFavouriteSeries
            }
        case ActionTypes.SAVE_SEARCH_TERM:
            const term = action.data;
            const total = [...state.searchTerms];
            if (!state.searchTerms.includes(term)) {
                total.unshift(term);
            }
            if (total.length > 4) {
                total.pop();
            }
            return {
                ...state,
                searchTerms: total
            }
        default:
            return state;
    }
}

export default reducer;