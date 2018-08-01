// @flow
import {
    ACTION_CHANGE_DISPLAYING_PLAYLIST, ACTION_TYPE_HIDE_ADD_TO_PLAYLIST_MODAL,
    ACTION_TYPE_HIDE_SONG_OPERATION_MODAL,
    ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL, ACTION_TYPE_SHOW_SONG_OPERATION_MODAL
} from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";
import type { Song } from "../models/Song";

export type PlaylistDetailPageState = {
    playlist: Playlist | null,
    modal: "SONG_OPERATION" | "ADD_TO_PLAYLIST" | null,
    operatingSong: Song | null
};

export function playlistDetailPageState(
    state: PlaylistDetailPageState = {
        playlist: null,
        modal: null,
        operatingSong: null
    },
    action: *
) {
    switch (action.type) {
        case ACTION_CHANGE_DISPLAYING_PLAYLIST:
            return Object.assign({}, state, {
                playlist: action.playlist
            });
        case ACTION_TYPE_SHOW_SONG_OPERATION_MODAL:
            return Object.assign({}, state, {
                modal: "SONG_OPERATION",
                operatingSong: action.song
            });
        case ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL:
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
