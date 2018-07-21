// @flow

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import type { Song } from "../models/Song";

export default class FetchSongService {
    static fetchAllSongs(): Promise<Array<Song>> {
        const client = new ApolloClient();
        return client
            .query({
                query: gql`
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
                `
            })
            .then(data => {
                return data.data['readSongs'];
            });
    }
}
