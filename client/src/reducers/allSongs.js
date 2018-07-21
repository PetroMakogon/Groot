// @flow
import { ACTION_LOAD_ALL_SONGS } from "../actions/actionTypes";
import type { Song } from "../models/Song";

export function allSongs(state: Array<Song> = [], action: *) {
    switch (action.type) {
        case ACTION_LOAD_ALL_SONGS:
            console.log(action);
            if (action.data) {
                return action.data;
            }
            return state;
        default:
            return state;
    }
}
