import { ACTION_SHOW_ERROR } from "./actionTypes";

export function showError(error: *) {
    console.error(error);
    return {
        type: ACTION_SHOW_ERROR,
        error
    };
}
