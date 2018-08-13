// @flow

import axios from "axios";
import StorageService from "./StorageService";
import persistedQuery from "../graphql/persisted_query.json";
import compress from "graphql-query-compress";

export default class AxiosService {
    static getAxiosInstance(query: *, variables: *) {
        let headers = {};
        const user = StorageService.readUser();
        if (user && user.Token) {
            headers["Authorization"] = "Bearer " + user.Token;
        }

        // webpack graphql loader will trim "query" at the beginning
        let compressedQuery = compress(query);
        if (compressedQuery.startsWith("{")) {
            compressedQuery = "query" + compressedQuery;
        }

        let data: { id?: string, query?: string, variables?: * } = {
            query: compressedQuery,
            variables: variables
        };

        /*
        * TODO: wait until backend support persisted query officially
        if (persistedQuery[compressedQuery]) {
            delete data.query;
            data.id = persistedQuery[compressedQuery];
        }
        */

        return axios.create({
            url: "/graphql",
            method: "post",
            data: data,
            headers: headers
        });
    }
}
