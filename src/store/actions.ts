import * as actions from './actionTypes';

export const selectedSeries = (data: any) => {
    console.log(data);
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}