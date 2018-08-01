// @flow
import type { Song } from "../models/Song";
import { ACTION_CHANGE_PLAYING_NOW } from "../actions/actionTypes";

export type PlayingNowState = {
    song: Song | null,
    queue: Array<Song>
};

export function playingNowState(
    state: PlayingNowState = { song: null, queue: [] },
    action: *
) {
    switch (action.type) {
        case ACTION_CHANGE_PLAYING_NOW:
            if (action.song && action.queue) {
                return {
                    song: action.song,
                    queue: action.queue
                };
            }
            return state;
        default:
            return state;
    }
}
