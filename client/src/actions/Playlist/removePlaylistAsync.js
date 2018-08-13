// @flow

import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import { loadAllPlaylistsAsync } from "./loadAllPlaylists";
import PlaylistService from "../../services/PlaylistService";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import { loadPlaylistDetailAsync } from "./loadPlaylistDetail";

export function removePlaylistAsync(playlist: Playlist) {
    return (dispatch: *) => {
        dispatch(startLoading());

        PlaylistService.removePlaylist(
            parseInt(playlist.ID)
        )
            .then(() => {
                dispatch(stopLoading());
                // TODO: better display -- maybe Toast
                console.log(
                    `playlist ${playlist.Title || ""} has been removed`
                );
                // TODO: better redirect, currently it will break playing music
                window.location.href = "/main/#/playlists";
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
