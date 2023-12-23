export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  createdAt?: Date;
}

export interface UserDto {
  displayName: string;
  email: string;
}
