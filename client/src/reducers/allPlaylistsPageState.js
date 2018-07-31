// @flow
import { ACTION_LOAD_ALL_PLAYLISTS } from "../actions/actionTypes";
import type { Playlist } from "../models/Playlist";

export type AllPlaylistsPageState = {
    playlists: Array<Playlist>
};

export function allPlaylistsPageState(
    state: AllPlaylistsPageState = { playlists: [] },
    action: *
) {
    switch (action.type) {
        case ACTION_LOAD_ALL_PLAYLISTS:
            if (action.data) {
                return {
                    playlists: action.data
                };
            }
            return state;
        default:
            return state;
    }
}
