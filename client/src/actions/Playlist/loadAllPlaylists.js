import { ACTION_LOAD_ALL_PLAYLISTS } from "../actionTypes";
import type { Playlist } from "../../models/Playlist";
import { stopLoading } from "../HUD/stopLoading";
import { startLoading } from "../HUD/startLoading";
import { showError } from "../HUD/showError";
import PlaylistService from "../../services/PlaylistService";

export function loadAllPlaylistsAsync() {
    return (dispatch: *) => {
        dispatch(startLoading());
        PlaylistService.fetchAllPlaylists()
            .then(playlists => {
                dispatch(stopLoading());
                dispatch(loadAllPlaylists(playlists));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}

export function loadAllPlaylists(data: Array<Playlist>) {
    return {
        type: ACTION_LOAD_ALL_PLAYLISTS,
        data
    };
}
