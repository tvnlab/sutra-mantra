import UserModel from "@library/api/model/user.model";
import {
  generateAccessToken,
  generateFingerprintingId,
  generateRefreshToken,
} from "@library/api/utils/auth";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import { logError } from "@library/api/utils/logger";
import message from "@library/api/utils/message";
import { omit } from "lodash";
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

  const { displayName, email, password, resolution, isAnonymous } = req.body;

  try {
    const fingerprintingId = generateFingerprintingId({
      userAgent,
      acceptLanguage,
      resolution,
    });
    const refreshToken = generateRefreshToken();

    if (isAnonymous) {
      // Check if the user already exists with the given fingerprintingId
      const existingUserByFingerprintingId = await UserModel.findOne({
        fingerprintingId,
      });
      const isRememberMe = true;
      const accessToken = generateAccessToken(
        existingUserByFingerprintingId._id,
        isRememberMe
      );

      if (existingUserByFingerprintingId) {
        // User already exists, return an error

        return res.status(HttpStatusCode.Created).json({
          message: message.success.registerSuccess,
          data: {
            user: omit(
              existingUserByFingerprintingId,
              "password",
              "fingerprintingId",
              "device"
            ),
            accessToken,
            refreshToken,
          },
        });
      }
      const anonymousName = "Anonymous-" + fingerprintingId;
      // Create a new user with fingerprintingId and set isAnonymous to true
      const newUser = new UserModel({
        fingerprintingId,
        isAnonymous: true,
        displayName: anonymousName,
        email: `${anonymousName}@sutramantra.today`,
        isRememberMe,
        password: anonymousName,
        device: `${userAgent}|_|${acceptLanguage}|_|${resolution}`,
        refreshToken,
      });
      await newUser.save();
      return res.status(HttpStatusCode.Created).json({
        message: message.success.registerSuccess,
        data: {
          user: omit(newUser, "password", "fingerprintingId", "device"),
          accessToken,
          refreshToken,
        },
      });
    } else {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ message: message.error.existing("Email") });
      }

      // Create a new user
      const newUser = new UserModel({
        displayName,
        email,
        password,
        fingerprintingId,
        isAnonymous: false,
        isRememberMe: false,
        device: `${userAgent}|_|${acceptLanguage}|_|${resolution}`,
        refreshToken,
      });
      await newUser.save();
      const accessToken = generateAccessToken(newUser._id, false);
      return res.status(HttpStatusCode.Created).json({
        message: message.success.registerSuccess,
        data: {
          user: omit(newUser, "password", "fingerprintingId", "device"),
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    logError(res, HttpStatusCode.InternalServerError);
  }
}
