// @flow
import type { Song } from "../models/Song";
import { ACTION_CHANGE_PLAYING_NOW } from "../actions/actionTypes";

export type PlayingNowState = Song | null;

export function playingNow(state: PlayingNowState = null, action: *) {
    switch (action.type) {
        case ACTION_CHANGE_PLAYING_NOW:
            if (action.song) {
                return action.song;
            }
            return state;
        default:
            return state;
    }
}
