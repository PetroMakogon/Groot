// @flow
import Song from './Song'

class Playlist {
    ID: string;
    LastEdited: string;
    Created: string;
    Title: string;
    Description: string;
    Songs: Array<Song>;
    NumberOfSongs: number;

    static createFromJSONObject(json: Object): Playlist {
        return Object.assign(new Playlist(), json);
    }
}

export default Playlist;
