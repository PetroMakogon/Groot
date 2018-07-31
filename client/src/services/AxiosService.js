// @flow

import axios from "axios";
import StorageService from "./StorageService";

export default class AxiosService {
    static getAxiosInstance(query: *, variables: *) {
        let headers = {};

        const user = StorageService.readUser();

        if (user && user.Token) {
            headers["Authorization"] = "Bearer " + user.Token;
        }

        return axios.create({
            url: "/graphql",
            method: "post",
            data: {
                query,
                variables
            },
            headers: headers
        });
    }
}
