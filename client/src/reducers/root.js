// @flow
import { combineReducers } from "redux";
import type { AllSongsPageState } from "./allSongsPageState";
import { allSongsPageState } from "./allSongsPageState";
import type { LoadingState } from "./loading";
import { loading } from "./loading";
import type { PlayingNowState } from "./playingNow";
import { playingNow } from "./playingNow";
import type { PlaylistDetailPageState } from "./playlistDetailPageState";
import { playlistDetailPageState } from "./playlistDetailPageState";
import type { AllPlaylistsPageState } from "./allPlaylistsPageState";
import { allPlaylistsPageState } from "./allPlaylistsPageState";
import type { UserState } from "./user";
import { user } from "./user";

export type RootState = {
    allSongsPageState: AllSongsPageState,
    loading: LoadingState,
    playingNow: PlayingNowState,
    playlistDetailPageState: PlaylistDetailPageState,
    allPlaylistsPageState: AllPlaylistsPageState,
    user: UserState
};

export const root = combineReducers({
    allSongsPageState,
    loading,
    playingNow,
    playlistDetailPageState,
    allPlaylistsPageState,
    user
});
