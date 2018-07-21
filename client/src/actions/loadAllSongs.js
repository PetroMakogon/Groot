// @flow
import { ACTION_LOAD_ALL_SONGS } from "./actionTypes";
import { Dispatch } from "redux";
import FetchSongService from "../services/FetchSongService";
import { startLoading } from "./startLoading";
import { stopLoading } from "./stopLoading";
import { showError } from "./showError";
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import { changeCurrentPlaylist } from "./changeCurrentPlaylist";

export function loadAllSongsAsync() {
    return (dispatch: Dispatch) => {
        dispatch(startLoading());
        changePlaylistToAllSong(dispatch, []);
        FetchSongService.fetchAllSongs()
            .then(songs => {
                dispatch(stopLoading());
                changePlaylistToAllSong(dispatch, songs);
                dispatch(loadAllSongs(songs));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}

export function loadAllSongs(data: Array<Song>) {
    return {
        type: ACTION_LOAD_ALL_SONGS,
        data
    };
}

function changePlaylistToAllSong(dispatch: Dispatch, songs: Array<Song> = []) {
    let playlist: Playlist = {
        ID: "0",
        Title: "All Songs",
        Description: "",
        Songs: songs
    };
    dispatch(changeCurrentPlaylist(playlist));
}
