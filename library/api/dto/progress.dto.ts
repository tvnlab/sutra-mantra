export interface ProgressDto {
  userId: string;
  topicId: string;
  currentCount: number;
  isFinished: boolean;
}

export interface IProgress extends ProgressDto {
  _id: string;
  createdDate?: Date;
}
