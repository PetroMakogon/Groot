// @flow

import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import { loadAllPlaylistsAsync } from "./loadAllPlaylists";
import PlaylistService from "../../services/PlaylistService";

export function createPlaylistAsync(title: string, description: string) {
    return (dispatch: *) => {
        dispatch(startLoading());

        PlaylistService.createPlaylist(title, description)
            .then(obj => {
                dispatch(stopLoading());
                dispatch(loadAllPlaylistsAsync());
                // TODO: go back via history service
                window.history.back();
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
