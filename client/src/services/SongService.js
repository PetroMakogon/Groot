// @flow

import type { Song } from "../models/Song";
import AxiosService from "./AxiosService";

export default class SongService {
    static fetchAllSongs(): Promise<Array<Song>> {
        const query = `
query {
    readSongs {
        ID
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
        `;
        return AxiosService.getAxiosInstance(query)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["readSongs"];
            });
    }
}
