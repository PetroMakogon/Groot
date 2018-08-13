import { ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL } from "../actionTypes";
import type { Song } from "../../models/Song";

export function showAddToPlaylistModal(song: Song) {
    return {
        type: ACTION_TYPE_SHOW_ADD_TO_PLAYLIST_MODAL,
        song
    };
}
