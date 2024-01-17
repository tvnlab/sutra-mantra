import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import { logError } from "@library/api/utils/logger";
import connectToDatabase from "@library/api/utils/database";
import UserModel, { IUserDoc } from "@library/api/model/user.model";

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
        const { username, password, isKeepLoggedIn } = req.body;
        const user: IUserDoc | null = await UserModel.findOne({
          email: username,
        });
        const isValidUser = await user.comparePassword(password);
        if (user && isValidUser) {
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.AUTH_ACCESS_TOKEN_SECRET,
            {
              expiresIn: isKeepLoggedIn
                ? process.env.AUTH_ACCESS_TOKEN_KEEP_LOGIN_EXPIRED
                : process.env.AUTH_ACCESS_TOKEN_EXPIRED || "1d",
            }
          );
          const refreshToken = jwt.sign(
            {},
            process.env.AUTH_REFRESH_TOKEN_SECRET,
            {
              expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRED || "7d",
            }
          );

          user.refreshToken = refreshToken;
          await user.save();

          res.json({ accessToken, refreshToken });
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
