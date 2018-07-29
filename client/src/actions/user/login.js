// @flow

import type { User } from "../../models/User";
import { ACTION_LOGIN } from "../actionTypes";

export function login(user: User) {
    return {
        type: ACTION_LOGIN,
        user
    };
}
