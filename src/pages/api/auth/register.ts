import UserModel from "@library/api/model/user.model";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import { logError } from "@library/api/utils/logger";
import message from "@library/api/utils/message";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.POST].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase();

  const { displayName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ message: message.error.existing("Email") });
    }

    // Create a new user
    const newUser = new UserModel({ displayName, email, password });
    await newUser.save();

    res
      .status(HttpStatusCode.Created)
      .json({ message: message.success.registerSuccess, data: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    logError(res, HttpStatusCode.InternalServerError);
  }
}
