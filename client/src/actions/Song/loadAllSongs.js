// @flow
import { ACTION_LOAD_ALL_SONGS } from "../actionTypes";
import { Dispatch } from "redux";
import SongService from "../../services/SongService";
import { startLoading } from "../HUD/startLoading";
import { stopLoading } from "../HUD/stopLoading";
import { showError } from "../HUD/showError";
import type { Song } from "../../models/Song";

export function loadAllSongsAsync() {
    return (dispatch: Dispatch) => {
        dispatch(startLoading());
        SongService.fetchAllSongs()
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
