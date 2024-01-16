import UserModel from "@library/api/model/user.model";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import { logError } from "@library/api/utils/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "@library/api/middleware/auth.middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.GET].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase(); // Connect to your MongoDB database
  const userId = checkValidToken(req, res);

  switch (req.method) {
    case ApiMethod.GET: {
      try {
        // Find the user in the database by ID
        const user = await UserModel.findById(userId);

        if (!user) {
          logError(res, HttpStatusCode.NotFound, "User");
        }

        // Return the user profile data (exclude sensitive information)
        const userProfile = {
          displayName: user.displayName,
          email: user.email,
        };

        res.status(HttpStatusCode.OK).json(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
    }
    default: {
      logError(res, HttpStatusCode.MethodNotAllowed);
    }
  }
}
