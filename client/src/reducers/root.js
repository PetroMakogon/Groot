// @flow
import { combineReducers } from "redux";
import { allSongs } from "./allSongs";
import { loading } from "./loading";
import { playingNow } from "./playingNow";
import { displayingPlaylist } from "./displayingPlaylist";
import { allPlaylists } from "./allPlaylists";
import type { AllSongsState } from "./allSongs";
import type { LoadingState } from "./loading";
import type { PlayingNowState } from "./playingNow";
import type { DisplayingPlaylistState } from "./displayingPlaylist";
import type { AllPlaylistsState } from "./allPlaylists";

export type RootState = {
    allSongs: AllSongsState,
    loading: LoadingState,
    playingNow: PlayingNowState,
    displayingPlaylist: DisplayingPlaylistState,
    allPlaylists: AllPlaylistsState
};

export const root = combineReducers({
    allSongs,
    loading,
    playingNow,
    displayingPlaylist,
    allPlaylists
});
