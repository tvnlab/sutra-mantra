import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import connectToDatabase from "@library/api/utils/database";
import TopicModel from "@library/api/model/topic.model";
import message from "@library/api/utils/message";
import { logError } from "@library/api/utils/logger";
import { TopicDto } from "@library/api/dto/topic.dto";
import { checkValidToken } from "@library/api/middleware/auth.middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.GET, ApiMethod.PUT].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase(); // Connect to your MongoDB database
  checkValidToken(req, res);

  const topicId = req.query.id as string;

  switch (req.method) {
    case ApiMethod.GET:
      try {
        const topic = await TopicModel.findById(topicId);

        if (!topic) {
          logError(res, HttpStatusCode.NotFound, "Topic");
          return;
        }

        res.status(HttpStatusCode.OK).json(topic);
      } catch (error) {
        console.error("Error getting topic:", error);

        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.PUT:
      try {
        const topicDto: TopicDto = {
          ...(req.body as TopicDto),
        };

        const result = await TopicModel.findById(topicId).lean();

        if (!result?._id) {
          logError(res, HttpStatusCode.NotFound, "Topic");
        }

        await TopicModel.updateOne(
          { _id: new Types.ObjectId(topicId) },
          topicDto
        );
        res
          .status(HttpStatusCode.OK)
          .json({ message: message.success.updatedMessage("Topic") });
      } catch (error) {
        console.error("Error updating topic:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}
