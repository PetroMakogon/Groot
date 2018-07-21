// @flow
import {
    ACTION_LOADING_START,
    ACTION_LOADING_STOP
} from "../actions/actionTypes";

export function loading(state: number = 0, action: *) {
    switch (action.type) {
        case ACTION_LOADING_START:
            return state + 1;
        case ACTION_LOADING_STOP:
            return Math.max(state - 1, 0);
        default:
            return state;
    }
}
