// @flow

import { ACTION_LOGIN, ACTION_LOGOUT } from "../actions/actionTypes";
import type { User } from "../models/User";

export type UserState = {
    user: User | null
};

export function userState(
    state: UserState = { user: window.localStorage.user },
    action: *
): UserState {
    switch (action.type) {
        case ACTION_LOGIN:
            return {
                user: action.user
            };
        case ACTION_LOGOUT:
            return {
                user: null
            };
        default:
            return state;
    }
}
