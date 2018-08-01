// @flow

import type { Playlist } from "../models/Playlist";
import AxiosService from "./AxiosService";
export default class PlaylistService {
    static fetchAllPlaylists(): Promise<Array<Playlist>> {
        const query = `
{
    readPlaylists {
        ID
        ClassName
        LastEdited
        Created
        Title
        Description
        NumberOfSongs
    }
}
        `;
        return AxiosService.getAxiosInstance(query)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["readPlaylists"];
            });
    }

    static fetchOnePlaylist(playlistID: number): Promise<Playlist> {
        const query = `
query ($playlistID: ID!){
  readOnePlaylist(ID: $playlistID) {
    ID
    ClassName
    LastEdited
    Created
    Title
    Description
    Songs {
      ID
      ClassName
      LastEdited
      Created
      Title
      Length
      Artist
      Album
      Disc
      Track
      StreamFile {
        id
        url
      }
    }
  }
}
        `;
        const variables = {
            playlistID: playlistID
        };
        return AxiosService.getAxiosInstance(query, variables)
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
        const query = `
mutation ($input: PlaylistCreateInputType!) {
  createPlaylist(Input: $input) {
    ID
    ClassName
    LastEdited
    Created
    Title
    Description
    NumberOfSongs
  }
}
        `;
        const variables = {
            input: {
                Title: title,
                Description: description
            }
        };

        return AxiosService.getAxiosInstance(query, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["createPlaylist"];
            });
    }

    static addSongToPlaylist(
        songID: number,
        playlistID: number
    ): Promise<Playlist> {
        const query = `
mutation ($songID: Int, $playlistID: Int) {
  addSongToPlaylist(SongID: $songID, PlaylistID: $playlistID) {
    ID
    ClassName
    LastEdited
    Created
    Title
    Description
    NumberOfSongs
  }
}
        `;
        const variables = {
            songID: songID,
            playlistID: playlistID
        };

        return AxiosService.getAxiosInstance(query, variables)
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
        const query = `
mutation ($songID: Int, $playlistID: Int) {
  removeSongFromPlaylist(SongID: $songID, PlaylistID: $playlistID) {
    ID
    ClassName
    LastEdited
    Created
    Title
    Description
    NumberOfSongs
  }
}
        `;
        const variables = {
            songID: songID,
            playlistID: playlistID
        };

        return AxiosService.getAxiosInstance(query, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["removeSongFromPlaylist"];
            });
    }
}
