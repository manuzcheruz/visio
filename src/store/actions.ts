import Series from '../interfaces/series';
import { UpdatedFavourites } from '../interfaces/updatedFavourites';
import * as actions from './actionTypes';
import { ActionTypes } from './actionTypes';

export interface RandomSeries {
    type: ActionTypes.RANDOM_TV_SERIES;
    data: Series[]
}

export interface SaveSearchTerm {
    type: ActionTypes.SAVE_SEARCH_TERM;
    data: string;
}

export interface UpdateFavourites {
    type: ActionTypes.UPDATE_FAVOURITE_SERIES;
    data: UpdatedFavourites;
}

export interface AddToFavourites {
    type: ActionTypes.ADD_TO_FAVOURITES;
    data: Series;
}

export interface RemoveFromFavourites {
    type: ActionTypes.REMOVE_FROM_FAVOURITES;
    data: Series;
}

export interface SelectedSeries {
    type: ActionTypes.SELECTED_SERIES;
    data: Series;
}

/**
 * Adding series to the store 
 * @param data 
 * @returns 
 */
export const randomSeries = (data: Series[]): RandomSeries => {
    return {
        type: ActionTypes.RANDOM_TV_SERIES,
        data: data
    }
}

/**
 * Adding a series to the store, when watch button is clicked
 * This is to eliminate the need for a fetch since we have all the data already
 * @param data 
 * @returns 
 */
export const selectedSeries = (data: Series): SelectedSeries => {
    return {
        type: ActionTypes.SELECTED_SERIES,
        data: data
    }
}

/**
 * Add a series to favourite list
 * @param data 
 * @returns 
 */
export const favourites = (data: Series): AddToFavourites => {
    return {
        type: ActionTypes.ADD_TO_FAVOURITES,
        data: data
    }
}

/**
 * Remove a series from the favourite list
 * @param data 
 * @returns 
 */
export const removeFavourites = (data: Series): RemoveFromFavourites => {
    return {
        type: ActionTypes.REMOVE_FROM_FAVOURITES,
        data: data
    }
}

/**
 * Updates users favourite series
 * @param updated 
 * @returns 
 */
export const updateFavourites = (updated: UpdatedFavourites): UpdateFavourites => {
    return {
        type: ActionTypes.UPDATE_FAVOURITE_SERIES,
        data: updated
    }
}

/**
 * saves user search terms so they can resuse them later
 * @param term 
 * @returns 
 */
export const saveSearchTerm = (term: string): SaveSearchTerm => {
    return {
        type: ActionTypes.SAVE_SEARCH_TERM,
        data: term
    }
}

export type Action = SaveSearchTerm | SelectedSeries | RemoveFromFavourites| AddToFavourites | RandomSeries | UpdateFavourites;