import jwt from "jsonwebtoken";
import message from "./message";

export const generateAccessToken = (
  userId: string,
  isRememberMe?: boolean
): string => {
  return jwt.sign({ userId: userId }, process.env.AUTH_ACCESS_TOKEN_SECRET, {
    expiresIn: isRememberMe
      ? process.env.AUTH_ACCESS_TOKEN_KEEP_LOGIN_EXPIRED
      : process.env.AUTH_ACCESS_TOKEN_EXPIRED,
  });
};

export const generateRefreshToken = (): string => {
  return jwt.sign({}, process.env.AUTH_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRED,
  });
};

export function verifyToken(token: string, isRefresh?: boolean): string {
  try {
    const decodedToken = jwt.verify(
      token,
      isRefresh
        ? process.env.AUTH_REFRESH_TOKEN_SECRET
        : process.env.AUTH_ACCESS_TOKEN_SECRET
    ) as jwt.JwtPayload;
    // Check if the token has expired
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      throw new Error(
        message.error.expired(isRefresh ? "Refresh Token" : "Access Token")
      );
    }

    return decodedToken.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
}