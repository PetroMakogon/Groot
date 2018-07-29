// @flow
import { combineReducers } from "redux";
import type { AllSongsState } from "./allSongs";
import { allSongs } from "./allSongs";
import type { LoadingState } from "./loading";
import { loading } from "./loading";
import type { PlayingNowState } from "./playingNow";
import { playingNow } from "./playingNow";
import type { DisplayingPlaylistState } from "./displayingPlaylist";
import { displayingPlaylist } from "./displayingPlaylist";
import type { AllPlaylistsState } from "./allPlaylists";
import { allPlaylists } from "./allPlaylists";
import type { UserState } from "./user";
import { user } from "./user";

export type RootState = {
    allSongs: AllSongsState,
    loading: LoadingState,
    playingNow: PlayingNowState,
    displayingPlaylist: DisplayingPlaylistState,
    allPlaylists: AllPlaylistsState,
    user: UserState
};

export const root = combineReducers({
    allSongs,
    loading,
    playingNow,
    displayingPlaylist,
    allPlaylists,
    user
});
