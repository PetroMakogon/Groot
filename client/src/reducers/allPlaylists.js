// @flow
import { ACTION_LOAD_ALL_PLAYLISTS } from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";

export type AllPlaylistsState = Array<Playlist>;

export function allPlaylists(state: AllPlaylistsState = [], action: *) {
    switch (action.type) {
        case ACTION_LOAD_ALL_PLAYLISTS:
            if (action.data) {
                return action.data;
            }
            return state;
        default:
            return state;
    }
}
