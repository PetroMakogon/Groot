// @flow
import {
    ACTION_LOAD_ALL_SONGS,
    ACTION_TYPE_HIDE_ADD_TO_PLAYLIST_MODAL,
    ACTION_TYPE_HIDE_SONG_OPERATION_MODAL,
    ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL,
    ACTION_TYPE_SHOW_SONG_OPERATION_MODAL
} from "../actions/actionTypes";
import type { Song } from "../models/Song";

export type AllSongsPageState = {
    songs: Array<Song>,
    modal: null | "SONG_OPERATION" | "ADD_TO_PLAYLIST",
    operatingSong: Song | null
};

export function allSongsPageState(
    state: AllSongsPageState = { songs: [], modal: null, operatingSong: null },
    action: *
) {
    switch (action.type) {
        case ACTION_LOAD_ALL_SONGS:
            if (action.data) {
                return Object.assign({}, state, {
                    songs: action.data
                });
            }
            return state;
        case ACTION_TYPE_SHOW_SONG_OPERATION_MODAL:
            // TODO: check if current page is <All Songs>
            return Object.assign({}, state, {
                modal: "SONG_OPERATION",
                operatingSong: action.song
            });
        case ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL:
            // TODO: check if current page is <All Songs>
            return Object.assign({}, state, {
                modal: "ADD_TO_PLAYLIST",
                operatingSong: action.song
            });
        case ACTION_TYPE_HIDE_SONG_OPERATION_MODAL:
        case ACTION_TYPE_HIDE_ADD_TO_PLAYLIST_MODAL:
            return Object.assign({}, state, {
                modal: null,
                operatingSong: null
            });
        default:
            return state;
    }
}
