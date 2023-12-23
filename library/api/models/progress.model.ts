import mongoose, { Document, Schema, Types } from "mongoose";

interface IProgress extends Document {
  userId: Types.ObjectId;
  topicId: Types.ObjectId;
  currentCount: number;
  isFinished: boolean;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    currentCount: { type: Number, default: 0 },
    isFinished: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const ProgressModel = mongoose.model<IProgress>("Progress", progressSchema);

export default ProgressModel;
