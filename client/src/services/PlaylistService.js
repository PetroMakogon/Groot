// @flow

import type { Playlist } from "../models/Playlist";
const axios = require("axios");

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
  }
}
        `;
        const request = axios({
            url: "/graphql",
            method: "post",
            data: {
                query: query
            },
            headers: {
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IkVtSUNOTFhBdG9TaTViNWI1MWJhYWY2MjMxLjgxNDg2MDgzIn0.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6MTAxMTFcLyIsImF1ZCI6Imh0dHA6XC9cLzEyNy4wLjAuMToxMDExMSIsImp0aSI6IkVtSUNOTFhBdG9TaTViNWI1MWJhYWY2MjMxLjgxNDg2MDgzIiwiaWF0IjoxNTMyNzExMzU0LCJuYmYiOjE1MzI3MTEzNTQsImV4cCI6MTUzMjcxNDk1NCwidWlkIjoxfQ.j10VbiE4MfuvlZuKLlMZj3Wje9SBcDjYkVXuqAx1HGA"
            }
        });
        return request.then(response => response.data).then(data => {
            return data.data["readPlaylists"];
        });
    }
}
