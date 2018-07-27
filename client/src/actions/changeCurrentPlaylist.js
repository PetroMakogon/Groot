import { ACTION_CHANGE_CURRENT_PLAYLIST } from "./actionTypes";
import type { Playlist } from "../models/Playlist";

export function changeCurrentPlaylist(playlist: Playlist) {
    return {
        type: ACTION_CHANGE_CURRENT_PLAYLIST,
        playlist
    };
}
