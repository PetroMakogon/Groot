import { ACTION_CHANGE_DISPLAYING_PLAYLIST } from "../actionTypes";
import type { Playlist } from "../../models/Playlist";
import { stopLoading } from "../HUD/stopLoading";
import { startLoading } from "../HUD/startLoading";
import PlaylistService from "../../services/PlaylistService";
import { showError } from "../HUD/showError";

export function changeDisplayingPlaylist(playlist: Playlist) {
    return {
        type: ACTION_CHANGE_DISPLAYING_PLAYLIST,
        playlist
    };
}

export function loadPlaylistAsync(playlistID: number) {
    return (dispatch: *) => {
        dispatch(changeDisplayingPlaylist(null));
        dispatch(startLoading());
        PlaylistService.fetchOnePlaylist(playlistID)
            .then(playlist => {
                dispatch(stopLoading());
                dispatch(changeDisplayingPlaylist(playlist));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
