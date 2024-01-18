import { generateAccessToken, generateRefreshToken } from '@library/api/utils/auth';
import { NextApiRequest, NextApiResponse } from "next";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import { logError } from "@library/api/utils/logger";
import connectToDatabase from "@library/api/utils/database";
import UserModel, { IUserDoc } from "@library/api/model/user.model";
import { omit } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.POST].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase();

  switch (req.method) {
    case ApiMethod.POST:
      try {
        const { username, password, isRememberMe } = req.body;
        const user: IUserDoc | null = await UserModel.findOne({
          email: username,
        });
        const isValidUser = await user.comparePassword(password);
        if (user && isValidUser) {
          const accessToken =  generateAccessToken(user._id, isRememberMe);
          const refreshToken = generateRefreshToken();

          user.refreshToken = refreshToken;
          await user.save();

          res.json({
            accessToken,
            refreshToken,
            user: omit(user, "password", "fingerprintingId", "device"),
          });
        } else {
          logError(res, HttpStatusCode.Unauthorized);
        }
      } catch (error) {
        console.error("Error creating progress:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}
