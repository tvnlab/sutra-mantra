import { CategoryCode } from "../utils/constants";

export interface ITopic {
  _id: string;
  name: string;
  category: CategoryCode;
  count: number;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt?: Date;
}

export interface TopicDto {
  name: string;
  category: CategoryCode;
  count?: number;
  title: string;
  content: string;
  author?: string;
  image?: string;
}
