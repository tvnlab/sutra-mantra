import mongoose, { Document, Schema, Types } from "mongoose";

interface IProgress extends Document {
  userId: Types.ObjectId;
  topicId: Types.ObjectId;
  currentCount: number;
  isFinished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProgressModelType = mongoose.Model<
  IProgress,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IProgress> &
    IProgress & {
      _id: Types.ObjectId;
    },
  any
>;

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    currentCount: { type: Number, default: 0 },
    isFinished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const ProgressModel =
  (mongoose.models.Progress as ProgressModelType) ||
  (mongoose.model<IProgress>("Progress", progressSchema) as ProgressModelType);

export default ProgressModel;
