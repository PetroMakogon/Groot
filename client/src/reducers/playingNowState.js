// @flow
import type { Song } from "../models/Song";
import {
    ACTION_CHANGE_PLAYING_NOW, ACTION_TYPE_HIDE_LYRIC_MODAL,
    ACTION_TYPE_LOAD_LYRIC,
    ACTION_TYPE_SHOW_LYRIC_MODAL
} from "../actions/actionTypes";

export type PlayingNowState = {
    song: Song | null,
    queue: Array<Song>,
    modal: "TXT_LYRIC" | null,
    txtLyric: string | null,
    lrcLyric: string | null
};

export function playingNowState(
    state: PlayingNowState = {
        song: null,
        queue: [],
        modal: null,
        txtLyric: null,
        lrcLyric: null
    },
    action: *
) {
    switch (action.type) {
        case ACTION_CHANGE_PLAYING_NOW:
            if (action.song && action.queue) {
                return Object.assign({}, state, {
                    song: action.song,
                    queue: action.queue
                });
            }
            return state;
        case ACTION_TYPE_LOAD_LYRIC:
            return Object.assign({}, state, {
                txtLyric: action.txtLyric,
                lrcLyric: action.lrcLyric
            });
        case ACTION_TYPE_SHOW_LYRIC_MODAL:
            // TODO: check txt/lrc
            return Object.assign({}, state, {
                modal: "TXT_LYRIC"
            });
        case ACTION_TYPE_HIDE_LYRIC_MODAL:
            return Object.assign({}, state, {
                modal: null
            });
        default:
            return state;
    }
}
