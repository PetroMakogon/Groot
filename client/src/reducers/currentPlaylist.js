// @flow
import { ACTION_CHANGE_CURRENT_PLAYLIST } from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";

export function currentPlaylist(state: Playlist | null = null, action: *) {
    switch (action.type) {
        case ACTION_CHANGE_CURRENT_PLAYLIST:
            if (action.playlist) {
                return action.playlist;
            }
            return state;
        default:
            return state;
    }
}
