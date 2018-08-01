// @flow
import { combineReducers } from "redux";
import type { AllSongsPageState } from "./allSongsPageState";
import { allSongsPageState } from "./allSongsPageState";
import type { LoadingState } from "./loadingState";
import { loadingState } from "./loadingState";
import type { PlayingNowState } from "./playingNowState";
import { playingNowState } from "./playingNowState";
import type { PlaylistDetailPageState } from "./playlistDetailPageState";
import { playlistDetailPageState } from "./playlistDetailPageState";
import type { AllPlaylistsPageState } from "./allPlaylistsPageState";
import { allPlaylistsPageState } from "./allPlaylistsPageState";
import type { UserState } from "./userState";
import { userState } from "./userState";

export type RootState = {
    allSongsPageState: AllSongsPageState,
    loadingState: LoadingState,
    playingNowState: PlayingNowState,
    playlistDetailPageState: PlaylistDetailPageState,
    allPlaylistsPageState: AllPlaylistsPageState,
    userState: UserState
};

export const root = combineReducers({
    allSongsPageState,
    playlistDetailPageState,
    allPlaylistsPageState,
    loadingState,
    playingNowState,
    userState
});
