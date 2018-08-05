// @flow

import type { Playlist } from "../models/Playlist";
import AxiosService from "./AxiosService";
import fetchAllPlaylistsQuery from "../graphql/fetchAllPlaylists.graphql";
import fetchOnePlaylistQuery from "../graphql/fetchOnePlaylist.graphql";
import createPlaylistQuery from "../graphql/createPlaylist.graphql";
import removePlaylistQuery from "../graphql/removePlaylist.graphql";
import addSongToPlaylistQuery from "../graphql/addSongToPlaylist.graphql";
import removeSongFromPlaylistQuery from "../graphql/removeSongFromPlaylist.graphql";

export default class PlaylistService {
    static fetchAllPlaylists(): Promise<Array<Playlist>> {
        return AxiosService.getAxiosInstance(fetchAllPlaylistsQuery)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["readPlaylists"];
            });
    }

    static fetchOnePlaylist(playlistID: number): Promise<Playlist> {
        const variables = {
            playlistID: playlistID
        };
        return AxiosService.getAxiosInstance(fetchOnePlaylistQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["readOnePlaylist"];
            });
    }

    static createPlaylist(
        title: string,
        description: string
    ): Promise<Playlist> {
        const variables = {
            input: {
                Title: title,
                Description: description
            }
        };

        return AxiosService.getAxiosInstance(createPlaylistQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["createPlaylist"];
            });
    }

    static removePlaylist(playlistID: number): Promise<void> {
        const variables = {
            playlistIDs: [playlistID]
        };

        return AxiosService.getAxiosInstance(removePlaylistQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {});
    }

    static addSongToPlaylist(
        songID: number,
        playlistID: number
    ): Promise<Playlist> {
        const variables = {
            songID: songID,
            playlistID: playlistID
        };

        return AxiosService.getAxiosInstance(addSongToPlaylistQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["addSongToPlaylist"];
            });
    }

    static removeSongFromPlaylist(
        songID: number,
        playlistID: number
    ): Promise<Playlist> {
        const variables = {
            songID: songID,
            playlistID: playlistID
        };

        return AxiosService.getAxiosInstance(removeSongFromPlaylistQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["removeSongFromPlaylist"];
            });
    }
}
