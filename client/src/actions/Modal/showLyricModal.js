import { ACTION_TYPE_SHOW_LYRIC_MODAL } from "../actionTypes";

export function showLyricModal(format: "txt" | "lrc" = "txt") {
    return {
        type: ACTION_TYPE_SHOW_LYRIC_MODAL
    };
}
