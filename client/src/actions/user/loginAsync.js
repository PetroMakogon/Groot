// @flow

import { startLoading } from "../HUD/startLoading";
import { Dispatch } from "redux";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import { login } from "./login";
import UserService from "../../services/UserService";
import type { User } from "../../models/User";
import StorageService from "../../services/StorageService";

export function loginAsync(email: string, password: string) {
    return (dispatch: Dispatch) => {
        dispatch(startLoading());
        UserService.createToken(email, password)
            .then((user: User) => {
                if(!user.Token) {
                    throw "User is not valid";
                }
                StorageService.saveUser(user);
                dispatch(stopLoading());
                dispatch(login(user));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
