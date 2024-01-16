import apiClient from "@app/utils/apiClient";
import { IUser, SessionToken } from "@library/api/dto/user.dto";

export const handleRefreshTokenApi = (refreshToken: string) => {
  return apiClient.post<SessionToken>("/auth/refresh", { refreshToken });
};

export const handleLoginApi = (
  username: string,
  password: string,
  isKeepLoggedIn = false
) => {
  return apiClient.post<SessionToken>("/auth/login", {
    username,
    password,
    isKeepLoggedIn,
  });
};
export const handleRegisterApi = (
  displayName: string,
  email:string,
  password: string,
) => {
  return apiClient.post<IUser>("/auth/register", {
    displayName,
    email,
    password,
  });
};
