// @flow
import { ACTION_CHANGE_DISPLAYING_PLAYLIST } from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";

export type DisplayingPlaylistState = Playlist | null;

export function displayingPlaylist(
    state: DisplayingPlaylistState = null,
    action: *
) {
    switch (action.type) {
        case ACTION_CHANGE_DISPLAYING_PLAYLIST:
            return action.playlist;
        default:
            return state;
    }
}
