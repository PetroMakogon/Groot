// @flow
import { combineReducers } from "redux";
import { allSongs } from "./allSongs";
import { loading } from "./loading";
import { playingNow } from "./playingNow";

export const root = combineReducers({
    allSongs,
    loading,
    playingNow
});
