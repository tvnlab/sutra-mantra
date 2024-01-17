import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../dto/user.dto";
import message from "../utils/message";
import { UserRole } from "../utils/constants";

export type IUserDoc = Document &
  IUser & {
    comparePassword?: (candidatePassword: string) => Promise<boolean>;
  };

type UserModelType = mongoose.Model<
  IUser,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IUser> &
    IUser &
    Required<{
      _id: string;
    }>,
  any
>;

const userSchema = new Schema<IUserDoc>(
  {
    fingerprintingId: {
      type: String,
      unique: true,
    },
    device:{
      type: String,
      unique: true
    },
    displayName: {
      type: String,
      required: [true, message.error.require("Display name")],
    },
    email: {
      type: String,
      required: [true, message.error.require("Email")],
      unique: true,
    },
    password: {
      type: String,
      required: [true, message.error.require("Password")],
    },
    refreshToken: String,
    isRememberMe: {
      type: Boolean,
      default: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    role:{
      type: String,
      default: UserRole.USER
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

userSchema.pre<IUserDoc>("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel =
  (mongoose.models.User as UserModelType) ||
  (mongoose.model<IUser>("User", userSchema) as UserModelType);

export default UserModel;
