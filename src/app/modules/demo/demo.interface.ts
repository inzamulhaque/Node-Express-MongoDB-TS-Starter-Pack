/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IDemo {
  demoData: string;
  isDeleted: boolean;
  status: string;
  role: "admin" | "demo";
}

export interface DemoModel extends Model<IDemo> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
