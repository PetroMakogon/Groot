// @flow
import AxiosService from "./AxiosService";
import type { User } from "../models/User";
import createTokenQuery from "../graphql/createToken.graphql";

export default class UserService {
    static createToken(email: string, password: string): Promise<User> {
        const variables = {
            email,
            password
        };
        return AxiosService.getAxiosInstance(createTokenQuery, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["createToken"];
            });
    }
}
