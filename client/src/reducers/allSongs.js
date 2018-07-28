// @flow
import { ACTION_LOAD_ALL_SONGS } from "../actions/actionTypes";
import type { Song } from "../models/Song";

export type AllSongsState = Array<Song>;

export function allSongs(state: AllSongsState = [], action: *) {
    switch (action.type) {
        case ACTION_LOAD_ALL_SONGS:
            if (action.data) {
                return action.data;
            }
            return state;
        default:
            return state;
    }
}
