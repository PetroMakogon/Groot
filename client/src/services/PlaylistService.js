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
}
