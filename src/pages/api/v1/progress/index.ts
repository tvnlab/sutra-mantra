import { NextApiRequest, NextApiResponse } from "next";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import ProgressModel from "@library/api/model/progress.model";
import message from "@library/api/utils/message";
import { logError } from "@library/api/utils/logger";
import connectToDatabase from "@library/api/utils/database";
import { checkValidToken } from "@library/api/middleware/auth.middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.GET, ApiMethod.POST].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase(); // Connect to your MongoDB database
  checkValidToken(req, res);

  switch (req.method) {
    case ApiMethod.GET:
      try {
        const progresses = await ProgressModel.find().lean();
        res.status(HttpStatusCode.OK).json(progresses);
      } catch (error) {
        console.error("Error getting progress data:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.POST:
      try {
        const { userId, topicId, currentCount } = req.body;

        const progress = new ProgressModel({ userId, topicId, currentCount });
        await progress.save();

        res
          .status(HttpStatusCode.Created)
          .json({ message: message.success.createdMessage("Progress") });
      } catch (error) {
        console.error("Error creating progress:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}
