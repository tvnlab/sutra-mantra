import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import ProgressModel from "@library/api/model/progress.model";
import message from "@library/api/utils/message";
import { logError } from "@library/api/utils/logger";
import connectToDatabase from "@library/api/utils/database";
import UserModel, { IUserDoc } from "@library/api/model/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  switch (req.method) {
    case ApiMethod.POST:
      try {
        const { email, password } = req.body;
        const user: IUserDoc | null = await UserModel.findOne({ email });

        if (user && (await user.comparePassword(password))) {
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.AUTH_ACCESS_TOKEN_SECRET,
            {
              expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRED || "1d",
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
