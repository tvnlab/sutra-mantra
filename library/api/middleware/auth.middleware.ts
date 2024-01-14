import { NextApiRequest, NextApiResponse } from "next";
import { checkHasToken, verifyToken } from "../utils/auth";
import { HttpStatusCode } from "../utils/constants";
import { logError } from "../utils/logger";
import message from "../utils/message";

// Middleware functions
export const checkValidToken = (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // Extract the access token from the request headers
  const token = checkHasToken(req, res);

  // Verify the access token
  const userId = verifyToken(token);
  return userId;
};
