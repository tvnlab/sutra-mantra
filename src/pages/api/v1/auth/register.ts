import UserModel from "@library/api/model/user.model";
import {
  generateAccessToken,
  generateFingerprintingId,
  generateRefreshToken,
} from "@library/api/utils/auth";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import { logError } from "@library/api/utils/logger";
import { omitProperties } from "@library/api/utils/object";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.POST].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase();

  const userAgent = req.headers["user-agent"] || "";
  const acceptLanguage = req.headers["accept-language"] || "";

  const { displayName, email, password, isAnonymous } = req.body;

  try {
    const fingerprintingId = generateFingerprintingId({
      userAgent,
      acceptLanguage,
    });
    const refreshToken = generateRefreshToken();

    // Check if the user already exists with the given fingerprintingId
    const existingUserByFingerprintingId = await UserModel.findOne({
      fingerprintingId,
    }).lean();

    if (isAnonymous) {
      if (existingUserByFingerprintingId) {
        const isRememberMe = true;
        const accessToken = generateAccessToken(
          existingUserByFingerprintingId._id,
          isRememberMe
        );

        // User already exists, return an error
        const omittedUser = await omitProperties(
          existingUserByFingerprintingId,
          ["password", "fingerprintingId", "device", "refreshToken"]
        );
        return res.status(HttpStatusCode.Created).json({
          user: omittedUser,
          accessToken,
          refreshToken,
        });
      } else {
        const isRememberMe = true;

        const anonymousName = "Anonymous-" + fingerprintingId;
        // Create a new user with fingerprintingId and set isAnonymous to true
        const newUser = new UserModel({
          fingerprintingId,
          isAnonymous: true,
          displayName: anonymousName,
          email: `${anonymousName}@sutramantra.today`,
          isRememberMe,
          password: anonymousName,
          device: `${userAgent}|_|${acceptLanguage}`,
          refreshToken,
        });
        await newUser.save();
        const accessToken = generateAccessToken(newUser._id, isRememberMe);
        const omittedUser = await omitProperties(newUser, [
          "password",
          "fingerprintingId",
          "device",
          "refreshToken",
        ]);
        return res.status(HttpStatusCode.Created).json({
          user: omittedUser,
          accessToken,
          refreshToken,
        });
      }
    } else {
      const isRememberMe = false;
      if (existingUserByFingerprintingId) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: existingUserByFingerprintingId._id },
          { $set: { displayName, email, password, isAnonymous, isRememberMe } },
          { new: true } // If you want to get the updated document
        );
        const accessToken = generateAccessToken(updatedUser._id, isRememberMe);
        const omittedUser = await omitProperties(updatedUser, [
          "password",
          "fingerprintingId",
          "device",
          "refreshToken",
        ]);
        return res.status(HttpStatusCode.Created).json({
          user: omittedUser,
          accessToken,
          refreshToken,
        });
      } else {
        // Create a new user
        const newUser = new UserModel({
          displayName,
          email,
          password,
          fingerprintingId,
          isAnonymous,
          isRememberMe,
          device: `${userAgent}|_|${acceptLanguage}`,
          refreshToken,
        });
        await newUser.save();
        const accessToken = generateAccessToken(newUser._id, isRememberMe);
        const omittedUser = await omitProperties(newUser, [
          "password",
          "fingerprintingId",
          "device",
          "refreshToken",
        ]);
        return res.status(HttpStatusCode.Created).json({
          user: omittedUser,
          accessToken,
          refreshToken,
        });
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    logError(res, HttpStatusCode.InternalServerError);
  }
}
