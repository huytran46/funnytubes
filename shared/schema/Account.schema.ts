import mongoose from "mongoose";
import type { IAccount } from "../models/Account";

const AccountSchema = new mongoose.Schema<IAccount>({
  email: String,
  password: String,
});

export default (mongoose.models.Account as mongoose.Model<IAccount>) ??
  mongoose.model("Account", AccountSchema);
