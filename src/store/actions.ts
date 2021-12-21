import * as actions from './actionTypes';

export const selectedSeries = (data: any) => {
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}

export const favourites = (data: any, status: boolean) => {
    const item = {
        item: data,
        status: status
    }
    return {
        type: actions.ADD_TO_FAVOURITES,
        data: item
    }
}