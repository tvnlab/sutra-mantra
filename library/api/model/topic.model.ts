import {
  CategoryCode,
  TOPIC_COUNT_DEFAULT,
} from "@library/api/utils/constants";
import mongoose, { Document, Schema } from "mongoose";
import { ITopic } from "../dto/topic.dto";

export type ITopicDoc = ITopic & Document;

type TopicModelType = mongoose.Model<
  ITopic,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ITopic> &
    ITopic &
    Required<{
      _id: string;
    }>,
  any
>;

const topicSchema = new Schema<ITopic>(
  {
    category: {
      type: String,
      default: CategoryCode.TRANSCRIBING_BUDDHA_NAME,
      required: true,
    },
    count: { type: Number, default: TOPIC_COUNT_DEFAULT },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const TopicModel =
  (mongoose.models.Topic as TopicModelType) ||
  (mongoose.model<ITopic>("Topic", topicSchema) as TopicModelType);

export default TopicModel;
