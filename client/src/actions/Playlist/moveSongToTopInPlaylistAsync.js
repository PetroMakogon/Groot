// @flow

import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import PlaylistService from "../../services/PlaylistService";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import { loadPlaylistDetailAsync } from "./loadPlaylistDetail";

export function moveSongToTopInPlaylistAsync(song: Song, playlist: Playlist) {
    return (dispatch: *) => {
        dispatch(startLoading());

        const songs = playlist.Songs || [];
        let songIDs: Array<number> = songs
            .map(item => parseInt(item.ID))
            .filter(id => id !== parseInt(song.ID));
        songIDs.unshift(parseInt(song.ID));

        PlaylistService.reorderSongsInPlaylist(parseInt(playlist.ID), songIDs)
            .then(result => {
                dispatch(stopLoading());
                dispatch(loadPlaylistDetailAsync(parseInt(playlist.ID)));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
