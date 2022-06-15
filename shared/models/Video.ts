import type { Types } from "mongoose";

export interface IVideo {
  _id?: Types.ObjectId;
  url: string;
  title: string;
  description: string;
  sharerId: Types.ObjectId;
}
