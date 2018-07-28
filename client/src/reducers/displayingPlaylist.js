// @flow
import { ACTION_CHANGE_DISPLAYING_PLAYLIST } from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";

export type DisplayingPlaylistState = Playlist | null;

export function displayingPlaylist(state: DisplayingPlaylistState = null, action: *) {
    switch (action.type) {
        case ACTION_CHANGE_DISPLAYING_PLAYLIST:
            if (action.playlist) {
                return action.playlist;
            }
            return state;
        default:
            return state;
    }
}
