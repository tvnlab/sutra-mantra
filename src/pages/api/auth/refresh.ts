import UserModel from "@library/api/model/user.model";
import { generateAccessToken, verifyToken } from "@library/api/utils/auth";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import message from "@library/api/utils/message";
import { NextApiRequest, NextApiResponse } from "next";
import { logError } from "@library/api/utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== ApiMethod.POST) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase(); // Connect to your MongoDB database

  // Extract the refresh token from the request body
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ message: message.error.required("Refresh token") });
  }

  try {
    // Verify the refresh token
    const userId = verifyToken(refreshToken, true);

    // Find the user in the database by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      logError(res, HttpStatusCode.NotFound, "User");
    }

    // Create a new access token and send it in the response
    const accessToken = generateAccessToken(user._id, user.isRememberMe);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: message.error.invalid("refresh token") });
  }
}
