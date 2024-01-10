import { UserDto } from "@library/api/dto/user.dto";
import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import UserModel from "@library/api/models/user.model";
import message from "@library/api/utils/message";
import { logError } from "@library/api/utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const userId = req.query.id as string;

  switch (req.method) {
    case ApiMethod.GET:
      try {
        const user = await UserModel.findById(userId);

        if (!user) {
          logError(res, HttpStatusCode.NotFound, "User");
          return;
        }

        res.status(HttpStatusCode.OK).json(user);
      } catch (error) {
        console.error("Error getting user:", error);

        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.PUT:
      try {
        const userDto: UserDto = {
          ...(req.body as UserDto),
        };

        const result = await UserModel.findById(userId).lean();

        if (!result?._id) {
          logError(res, HttpStatusCode.NotFound, "User");
        }

        await UserModel.updateOne({ _id: new Types.ObjectId(userId) }, userDto);
        res
          .status(HttpStatusCode.OK)
          .json({ message: message.success.updatedMessage("User") });
      } catch (error) {
        console.error("Error updating user:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.DELETE:
      try {
        await UserModel.deleteOne({ _id: new Types.ObjectId(userId) });
        res
          .status(HttpStatusCode.OK)
          .json({ message: message.success.deletedMessage("User") });
      } catch (error) {
        console.error("Error deleting user:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}
