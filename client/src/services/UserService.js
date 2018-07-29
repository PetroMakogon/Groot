import AxiosService from "./AxiosService";
import type {User} from "../models/User";

export default class UserService {
    static createToken(email: string, password: string): Promise<User> {
        const query = `
mutation {
  createToken(Email: "${email}", Password: "${password}") {
    ID
    FirstName
    Surname
    Email
    Token
  }
}
        `;
        return AxiosService.getAxiosInstance(query)
            .request()
            .then(response => response.data)
            .then(data => {
                return data.data["createToken"];
            });
    }
}
