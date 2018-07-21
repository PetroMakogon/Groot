import { ACTION_SHOW_ERROR } from "./actionTypes";

export function showError(error: *) {
    return {
        type: ACTION_SHOW_ERROR,
        error
    };
}
