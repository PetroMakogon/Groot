// @flow

import axios from "axios";
import JSONService from "./JSONService";

export default class AxiosService {
    static getAxiosInstance(query: *) {
        let headers = {};

        const user = JSONService.parseJSON(window.localStorage.user);

        if (user && user.Token) {
            headers["Authorization"] = "Bearer " + user.Token;
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
