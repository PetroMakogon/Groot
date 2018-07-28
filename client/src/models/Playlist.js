// @flow

import type { Song } from "./Song";

export type Playlist = {
    ID: string,
    LastEdited?: string,
    Created?: string,
    Title?: string,
    Description?: string,
    Songs?: Array<Song>,
    NumberOfSongs?: number
};
