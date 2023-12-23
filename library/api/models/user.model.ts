import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../dto/user.dto";
import message from "../utils/message";

export type IUserDoc = IUser & Document;

const userSchema = new Schema<IUserDoc>(
  {
    displayName: { type: String, required: [true, message.error.require('Display name')] },
    email: { type: String, required: [true, message.error.require('Email')], unique: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
