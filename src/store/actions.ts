import * as actions from './actionTypes';

export const selectedSearch = (data: any) => {
    return {
        type: actions.SELECTED_SEARCH_RESULT,
        data: data
    }
}