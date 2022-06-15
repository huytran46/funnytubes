import mongoose, { Types } from "mongoose";
import type { IVideo } from "../models/Video";

const VideoSchema = new mongoose.Schema<IVideo>({
  url: String,
  title: String,
  description: String,
  sharerId: Types.ObjectId,
});

export default (mongoose.models.Video as mongoose.Model<IVideo>) ??
  mongoose.model("Video", VideoSchema);
