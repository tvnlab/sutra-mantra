import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import message from "@library/api/utils/message";
import { logError } from "@library/api/utils/logger";
import ProgressModel from "@library/api/model/progress.model";
import { ProgressDto } from "@library/api/dto/progress.dto";
import { checkValidToken } from "@library/api/middleware/auth.middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.GET, ApiMethod.PUT, ApiMethod.DELETE].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase(); // Connect to your MongoDB database
  checkValidToken(req, res);

  const progressId = req.query.id as string;

  switch (req.method) {
    case ApiMethod.GET:
      try {
        const progress = await ProgressModel.findById(progressId);

        if (!progress) {
          logError(res, HttpStatusCode.NotFound, "Progress");
          return;
        }

        res.status(HttpStatusCode.OK).json(progress);
      } catch (error) {
        console.error("Error getting progress:", error);

        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.PUT:
      try {
        const progressDto: ProgressDto = {
          ...(req.body as ProgressDto),
        };

        const result = await ProgressModel.findById(progressId).lean();

        if (!result?._id) {
          logError(res, HttpStatusCode.NotFound, "Progress");
        }

        await ProgressModel.updateOne(
          { _id: new Types.ObjectId(progressId) },
          progressDto
        );
        res
          .status(HttpStatusCode.OK)
          .json({ message: message.success.updatedMessage("Progress") });
      } catch (error) {
        console.error("Error updating progress:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.DELETE:
      try {
        await ProgressModel.deleteOne({ _id: new Types.ObjectId(progressId) });
        res
          .status(HttpStatusCode.OK)
          .json({ message: message.success.deletedMessage("Progress") });
      } catch (error) {
        console.error("Error deleting progress:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}
