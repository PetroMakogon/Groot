// @flow
import {
    ACTION_LOADING_START,
    ACTION_LOADING_STOP
} from "../actions/actionTypes";

export type LoadingState = {
    loadingCount: number
};

export function loadingState(state: LoadingState = {loadingCount: 0}, action: *) {
    switch (action.type) {
        case ACTION_LOADING_START:
            return Object.assign({}, state, {
                loadingCount: state.loadingCount + 1
            });
        case ACTION_LOADING_STOP:
            return Object.assign({}, state, {
                loadingCount: Math.max(state.loadingCount - 1, 0)
            });
        default:
            return state;
    }
}
