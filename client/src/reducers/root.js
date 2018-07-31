// @flow
import { combineReducers } from "redux";
import type { AllSongsPageState } from "./allSongsPageState";
import { allSongsPageState } from "./allSongsPageState";
import type { LoadingState } from "./loading";
import { loading } from "./loading";
import type { PlayingNowState } from "./playingNow";
import { playingNow } from "./playingNow";
import type { DisplayingPlaylistState } from "./displayingPlaylist";
import { displayingPlaylist } from "./displayingPlaylist";
import type { AllPlaylistsPageState } from "./allPlaylistsPageState";
import { allPlaylistsPageState } from "./allPlaylistsPageState";
import type { UserState } from "./user";
import { user } from "./user";

export type RootState = {
    allSongsPageState: AllSongsPageState,
    loading: LoadingState,
    playingNow: PlayingNowState,
    displayingPlaylist: DisplayingPlaylistState,
    allPlaylistsPageState: AllPlaylistsPageState,
    user: UserState
};

export const root = combineReducers({
    allSongsPageState,
    loading,
    playingNow,
    displayingPlaylist,
    allPlaylistsPageState,
    user
});
