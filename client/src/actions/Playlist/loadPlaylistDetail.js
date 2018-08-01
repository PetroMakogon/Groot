import { ACTION_CHANGE_DISPLAYING_PLAYLIST } from "../actionTypes";
import type { Playlist } from "../../models/Playlist";
import { stopLoading } from "../HUD/stopLoading";
import { startLoading } from "../HUD/startLoading";
import PlaylistService from "../../services/PlaylistService";
import { showError } from "../HUD/showError";

export function loadPlaylistDetail(playlist: Playlist) {
    return {
        type: ACTION_CHANGE_DISPLAYING_PLAYLIST,
        playlist
    };
}

export function loadPlaylistDetailAsync(playlistID: number) {
    return (dispatch: *) => {
        dispatch(loadPlaylistDetail(null));
        dispatch(startLoading());
        PlaylistService.fetchOnePlaylist(playlistID)
            .then(playlist => {
                dispatch(stopLoading());
                dispatch(loadPlaylistDetail(playlist));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
