import { AuthModel } from "pocketbase";

export interface UserModel {
    isValid: boolean;
    authModel: AuthModel | null;
    token: string;
}
