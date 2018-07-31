// @flow

import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import { loadAllPlaylistsAsync } from "./loadAllPlaylists";
import PlaylistService from "../../services/PlaylistService";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";

export function addSongToPlaylistAsync(song: Song, playlist: Playlist) {
    return (dispatch: *) => {
        dispatch(startLoading());

        PlaylistService.addSongToPlaylist(
            parseInt(song.ID),
            parseInt(playlist.ID)
        )
            .then(obj => {
                dispatch(stopLoading());
                dispatch(loadAllPlaylistsAsync());
                // TODO: better display -- maybe Toast
                console.log(
                    `${
                        song.Title
                    } has been added to playlist ${playlist.Title || ""}`
                );
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
