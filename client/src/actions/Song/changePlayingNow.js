import type { Song } from "../../models/Song";
import { ACTION_CHANGE_PLAYING_NOW } from "../actionTypes";

export function changePlayingNow(song: Song, queue: Array<Song>) {
    return {
        type: ACTION_CHANGE_PLAYING_NOW,
        song,
        queue
    };
}
