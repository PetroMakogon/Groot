// @flow

import type { Song } from "../models/Song";
import AxiosService from "./AxiosService";
import fetchAllSongsQuery from "../graphql/fetchAllSongs.graphql";
import fetchSongLyricQuery from "../graphql/fetchSongLyric.graphql";

export default class SongService {
    static fetchAllSongs(): Promise<Array<Song>> {
        return AxiosService.getAxiosInstance(fetchAllSongsQuery)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["readSongs"];
            });
    }

    static fetchSongLyric(
        songID: number
    ): Promise<{ txtLyric: string, lrcLyric: string }> {
        const variables = {
            id: songID
        };
        return AxiosService.getAxiosInstance(fetchSongLyricQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                const container = data.data["readOneSong"] || {};
                return {
                    txtLyric: container.TXTLyric,
                    lrcLyric: container.LRCLyric
                };
            });
    }
}
