import Series from '../interfaces/series';
import * as actions from './actionTypes';

export const randomSeries = (data: Series[]) => {
    return {
        type: actions.RANDOM_TV_SERIES,
        data: data
    }
}

export const selectedSeries = (data: Series) => {
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}

export const favourites = (data: Series) => {
    return {
        type: actions.ADD_TO_FAVOURITES,
        data: data
    }
}

export const removeFavourites = (data: Series) => {
    return {
        type: actions.REMOVE_FROM_FAVOURITES,
        data: data
    }
}