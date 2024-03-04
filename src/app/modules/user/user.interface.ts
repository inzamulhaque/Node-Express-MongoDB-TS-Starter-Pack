import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  role?: "ser";
}

export interface UserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
