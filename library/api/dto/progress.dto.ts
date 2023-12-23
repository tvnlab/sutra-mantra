
export interface IProgress {
  _id: string;
  userId: string;
  topicId: string;
  currentCount: number;
  isFinished: boolean;
  createdDate?: Date;
}

export interface ProgressDto {
  userId: string;
  topicId: string;
  currentCount: number;
  isFinished: boolean;
}
