import {
  CategoryCode,
  TOPIC_COUNT_DEFAULT,
} from "@library/api/utils/constants";
import mongoose, { Document, Schema } from "mongoose";
import { ITopic } from "../dto/topic.dto";

export type ITopicDoc = ITopic & Document;

const topicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true },
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

const TopicModel = mongoose.model<ITopic>("Topic", topicSchema);

export default TopicModel;
