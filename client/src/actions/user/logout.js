// @flow

import { ACTION_LOGIN } from "../actionTypes";

export function logout() {
    window.localStorage.removeItem("user");
    return {
        type: ACTION_LOGIN
    };
}
