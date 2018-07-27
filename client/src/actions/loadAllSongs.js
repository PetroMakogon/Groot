// @flow
import { ACTION_LOAD_ALL_SONGS } from "./actionTypes";
import { Dispatch } from "redux";
import FetchSongService from "../services/FetchSongService";
import { startLoading } from "./startLoading";
import { stopLoading } from "./stopLoading";
import { showError } from "./showError";
import type { Song } from "../models/Song";

export function loadAllSongsAsync() {
    return (dispatch: Dispatch) => {
        dispatch(startLoading());
        FetchSongService.fetchAllSongs()
            .then(songs => {
                dispatch(stopLoading());
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
