// @flow

import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import { loadAllPlaylistsAsync } from "./loadAllPlaylists";
import PlaylistService from "../../services/PlaylistService";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import { loadPlaylistDetailAsync } from "./loadPlaylistDetail";

export function removeSongFromPlaylistAsync(song: Song, playlist: Playlist) {
    return (dispatch: *) => {
        dispatch(startLoading());

        PlaylistService.removeSongFromPlaylist(
            parseInt(song.ID),
            parseInt(playlist.ID)
        )
            .then(obj => {
                dispatch(stopLoading());
                dispatch(loadAllPlaylistsAsync());
                dispatch(loadPlaylistDetailAsync(playlist.ID));
                // TODO: better display -- maybe Toast
                console.log(
                    `${
                        song.Title
                    } has been removed from playlist ${playlist.Title || ""}`
                );
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
