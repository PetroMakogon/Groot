// @flow
class Song {
    ID: string;
    LastEdited: string;
    Created: string;
    Title: string;
    Length: string;
    Artist: string;
    Album: string;
    Disc: number;
    Track: number;

    static createFromJSONObject(json: Object): Song {
        return Object.assign(new Song(), json);
    }
}

export default Song;
