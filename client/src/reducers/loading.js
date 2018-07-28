// @flow
import {
    ACTION_LOADING_START,
    ACTION_LOADING_STOP
} from "../actions/actionTypes";

export type LoadingState = number;

export function loading(state: LoadingState = 0, action: *) {
    switch (action.type) {
        case ACTION_LOADING_START:
            return state + 1;
        case ACTION_LOADING_STOP:
            return Math.max(state - 1, 0);
        default:
            return state;
    }
}
