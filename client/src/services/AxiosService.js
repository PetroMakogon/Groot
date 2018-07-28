// @flow

import axios from "axios";

export default class AxiosService {
    static getAxiosInstance(query: *) {
      return axios.create({
          url: "/graphql",
          method: "post",
          data: {
            query: query
          },
          headers: {
            Authorization: "Bearer " + window.localStorage.accessToken
          }
        });
    }
}
