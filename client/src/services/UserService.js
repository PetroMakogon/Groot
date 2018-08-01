import AxiosService from "./AxiosService";
import type { User } from "../models/User";

export default class UserService {
    static createToken(email: string, password: string): Promise<User> {
        const query = `
mutation ($email: String!, $password: String!) {
  createToken(Email: $email, Password: $password) {
    ID
    FirstName
    Surname
    Email
    Token
  }
}
        `;
        const variables = {
            email,
            password
        };
        return AxiosService.getAxiosInstance(query, variables)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["createToken"];
            });
    }
}
