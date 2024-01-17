import { UserRole } from "../utils/constants";

export interface UserDto {
  fingerprintingId?: string;
  device?: string;
  displayName?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  isRememberMe?: boolean;
  isAnonymous?: boolean;
  role?: UserRole;
}

export interface IUser extends UserDto {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionToken{
  accessToken: string;
  refreshToken: string;
  user: IUser;
}