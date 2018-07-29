// @flow

import axios from "axios";

export default class AxiosService {
    static getAxiosInstance(query: *) {
        let headers = {};

        if (window.localStorage.user && window.localStorage.user.Token) {
            headers["Authorization"] =
                "Bearer " + window.localStorage.user.Token;
        }

        return axios.create({
            url: "/graphql",
            method: "post",
            data: {
                query: query
            },
            headers: headers
        });
    }
}
