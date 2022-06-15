import type { Types } from "mongoose";
export interface IAccount {
  _id?: Types.ObjectId;
  email: string;
  password: string;
}
