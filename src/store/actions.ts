import * as actions from './actionTypes';

export const selectedSeries = (data: any) => {
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}

export const favourites = (data: any) => {
    return {
        type: actions.ADD_TO_FAVOURITES,
        data: data
    }
}

export const removeFavourites = (data: any) => {
    return {
        type: actions.REMOVE_FROM_FAVOURITES,
        data: data
    }
}