// @flow

import {ACTION_LOGIN, ACTION_LOGOUT} from "../actions/actionTypes";

export type UserState = {
    user: {
        ID: string,
        FirstName: string,
        Surname: string,
        Email: string,
        Token: string
    } | null
};

export function userState(state: UserState = { user: null }, action: *): UserState {
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
