import { CategoryCode } from "../utils/constants";

export interface TopicDto {
  category: CategoryCode;
  count?: number;
  title: string;
  content: string;
  author?: string;
  image?: string;
}

export interface ITopic extends TopicDto {
  _id: string;
  createdAt?: Date;
}
