// @flow
import type { Song } from "../models/Song";
import { ACTION_CHANGE_PLAYING_NOW } from "../actions/actionTypes";

export function playingNow(state: Song | null = null, action: *) {
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
