import UserModel from "@library/api/model/user.model";
import { verifyToken } from "@library/api/utils/auth";
import { HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import { logError } from "@library/api/utils/logger";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectToDatabase(); // Connect to your MongoDB database

  // Extract the access token from the request headers
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    logError(res, HttpStatusCode.Unauthorized);
  }

  try {
    // Verify the access token
    const userId = verifyToken(token);

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
