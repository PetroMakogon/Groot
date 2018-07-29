// @flow

import type { User } from "../../models/User";
import { ACTION_LOGIN } from "../actionTypes";

export function login(user: User) {
    window.localStorage.setItem("user", user);
    return {
        type: ACTION_LOGIN,
        user
    };
}
