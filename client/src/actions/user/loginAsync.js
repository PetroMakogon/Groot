// @flow

import { startLoading } from "../startLoading";
import { Dispatch } from "redux";
import { stopLoading } from "../stopLoading";
import { showError } from "../showError";
import { login } from "./login";
import UserService from "../../services/UserService";
import type { User } from "../../models/User";

export function loginAsync(email: string, password: string) {
    return (dispatch: Dispatch) => {
        dispatch(startLoading());
        UserService.createToken(email, password)
            .then((user: User) => {
                dispatch(stopLoading());
                dispatch(login(user));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
