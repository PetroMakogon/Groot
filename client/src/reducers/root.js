// @flow
import { combineReducers } from "redux";
import { allSongs } from "./allSongs";
import { loading } from "./loading";

export const root = combineReducers({
    allSongs,
    loading
});
