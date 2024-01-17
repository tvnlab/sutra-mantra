export interface UserDto {
  fingerprintingId?: string;
  displayName?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  isRememberMe?: boolean;
  isAnonymous?: boolean;
}

export interface IUser extends UserDto {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionToken{
  accessToken: string;
  refreshToken: string;
}