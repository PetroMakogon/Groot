import { ACTION_TYPE_LOAD_LYRIC } from "../actionTypes";
import { stopLoading } from "../HUD/stopLoading";
import { startLoading } from "../HUD/startLoading";
import { showError } from "../HUD/showError";
import SongService from "../../services/SongService";

export function loadSongLyricAsync(songID: number) {
    return (dispatch: *) => {
        dispatch(startLoading());
        SongService.fetchSongLyric(songID)
            .then(payload => {
                dispatch(stopLoading());
                dispatch({
                    type: ACTION_TYPE_LOAD_LYRIC,
                    txtLyric: payload.txtLyric,
                    lrcLyric: payload.lrcLyric
                });
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(showError(error));
            });
    };
}
