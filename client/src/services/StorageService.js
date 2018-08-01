import type { User } from "../models/User";

export default class StorageService {
    static saveUser(user: User) {
        window.localStorage.user = JSON.stringify(user);
    }

    static readUser(): User | null {
        return this.parseJSON(window.localStorage.user);
    }

    static removeUser() {
        window.localStorage.removeItem("user");
    }

    static parseJSON(text: string) {
        try {
            return JSON.parse(text);
        } catch (e) {
            return null;
        }
    }
}