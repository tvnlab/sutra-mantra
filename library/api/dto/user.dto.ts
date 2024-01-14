export interface UserDto {
  displayName: string;
  email: string;
  password?: string;
  refreshToken?: string;
  isRememberMe?: boolean;
}

export interface IUser extends UserDto {
  _id: string;
  createdAt?: Date;
}
