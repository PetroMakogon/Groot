// @flow
import { combineReducers } from "redux";
import { allSongs } from "./allSongs";
import { loading } from "./loading";
import { playingNow } from "./playingNow";
import { currentPlaylist } from "./currentPlaylist";
import { allPlaylists } from "./allPlaylists";
import type { AllSongsState } from "./allSongs";
import type { LoadingState } from "./loading";
import type { PlayingNowState } from "./playingNow";
import type { CurrentPlaylistState } from "./currentPlaylist";
import type { AllPlaylistsState } from "./allPlaylists";

export type RootState = {
    allSongs: AllSongsState,
    loading: LoadingState,
    playingNow: PlayingNowState,
    currentPlaylist: CurrentPlaylistState,
    allPlaylists: AllPlaylistsState
};

export const root = combineReducers({
    allSongs,
    loading,
    playingNow,
    currentPlaylist,
    allPlaylists
});
