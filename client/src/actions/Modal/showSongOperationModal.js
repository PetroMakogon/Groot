import { ACTION_TYPE_SHOW_SONG_OPERATION_MODAL } from "../actionTypes";
import type { Song } from "../../models/Song";

export function showSongOperationModal(song: Song) {
    return {
        type: ACTION_TYPE_SHOW_SONG_OPERATION_MODAL,
        song
    };
}
