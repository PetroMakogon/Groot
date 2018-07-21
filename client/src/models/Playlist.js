// @flow

import type { Song } from './Song'

export type Playlist = {
    ID: string,
    NumberOfSongs: number,
    LastEdited?: string,
    Created?: string,
    Title?: string,
    Description?: string,
    Songs?: Array<Song>,
};
