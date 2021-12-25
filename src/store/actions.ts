import Series from '../interfaces/series';
import * as actions from './actionTypes';

/**
 * Adding series to the store 
 * @param data 
 * @returns 
 */
export const randomSeries = (data: Series[]) => {
    return {
        type: actions.RANDOM_TV_SERIES,
        data: data
    }
}

/**
 * Adding a series to the store, when watch button is clicked
 * This is to eliminate the need for a fetch since we have all the data already
 * @param data 
 * @returns 
 */
export const selectedSeries = (data: Series) => {
    return {
        type: actions.SELECTED_SERIES,
        data: data
    }
}

/**
 * Add a series to favourite list
 * @param data 
 * @returns 
 */
export const favourites = (data: Series) => {
    return {
        type: actions.ADD_TO_FAVOURITES,
        data: data
    }
}

/**
 * Remove a series from the favourite list
 * @param data 
 * @returns 
 */
export const removeFavourites = (data: Series) => {
    return {
        type: actions.REMOVE_FROM_FAVOURITES,
        data: data
    }
}

export const updateFavourites = (updated: any) => {
    return {
        type: actions.UPDATE_FAVOURITE_SERIES,
        data: updated
    }
}