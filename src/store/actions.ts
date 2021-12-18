import * as actions from './actionTypes';

export const selectedSeries = (data: any) => {
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}