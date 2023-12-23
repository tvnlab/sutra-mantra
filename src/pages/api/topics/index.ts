import { NextApiRequest, NextApiResponse } from "next";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import TopicModel from "@library/api/models/topic.model";
import { logError } from "@library/api/utils/log";
import { TopicDto } from "@library/api/dto/topic.dto";
import message from "@library/api/utils/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case ApiMethod.GET:
      try {
        const {
          page = 1,
          pageSize = 10,
          searchName,
          searchContent,
          sortBy = "createdAt",
        } = req.query;
        const skip = ((page as number) - 1) * (pageSize as number);

        const query: any = {};

        if (searchName) {
          query.name = { $regex: searchName, $options: "i" };
        }

        if (searchContent) {
          query.content = { $regex: searchContent, $options: "i" };
        }

        const sort: any = {};
        sort[sortBy as string] = 1; // 1 for ascending, -1 for descending

        const topics = await TopicModel.find(query)
          .sort(sort)
          .skip(skip)
          .limit(parseInt(pageSize as string, 10))
          .lean();

        res.status(HttpStatusCode.OK).json(topics);
      } catch (error) {
        console.error("Error getting topics:", error);
        logError(res, HttpStatusCode.InternalServerError);
      }
      break;

    case ApiMethod.POST:
      try {
        const topicDto: TopicDto = {
          ...(req.body as TopicDto),
        };

        const topic = new TopicModel(topicDto);
        const validationErrors = topic.validateSync();

        if (Object.keys(validationErrors.errors).length > 0) {
          res
            .status(HttpStatusCode.BadRequest)
            .json({ errors: validationErrors.errors });
          return;
        }
        await topic.save();

        res
          .status(HttpStatusCode.Created)
          .json({ message: message.success.createdMessage("Topic") });
      } catch (error) {
        console.error("Error creating topic:", error);
        res
          .status(HttpStatusCode.InternalServerError)
          .json({ message: message.error[HttpStatusCode.InternalServerError] });
      }
      break;

    default:
      logError(res, HttpStatusCode.MethodNotAllowed);
  }
}