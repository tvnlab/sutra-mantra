import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@library/api/utils/database";
import UserModel from "@library/api/model/user.model";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import message from "@library/api/utils/message";
import { UserDto } from "@library/api/dto/user.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case ApiMethod.GET:
      try {
        // Pagination
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
        const skip = (page - 1) * pageSize;

        // Search by name
        const searchName = req.query.searchName as string;
        const searchQuery = searchName
          ? { displayName: { $regex: searchName, $options: "i" } }
          : {};

        // Sort by creation date
        const sort: { createdAt: "asc" | "desc" } = { createdAt: "desc" };

        const users = await UserModel.find(searchQuery)
          .sort(sort)
          .skip(skip)
          .limit(pageSize)
          .lean(); // Adding lean() to return plain JavaScript objects instead of Mongoose documents

        res.status(HttpStatusCode.OK).json(users);
      } catch (error) {
        console.error("Error getting users:", error);
        res
          .status(HttpStatusCode.InternalServerError)
          .json({ message: message.error[HttpStatusCode.InternalServerError] });
      }
      break;

    case ApiMethod.POST:
      try {
        const userDto: UserDto = {
          displayName: req.body.displayName,
          email: req.body.email,
        };

        const user = new UserModel(userDto);
        const validationErrors = user.validateSync();

        if (Object.keys(validationErrors.errors).length > 0) {
          res
            .status(HttpStatusCode.BadRequest)
            .json({ errors: validationErrors.errors });
          return;
        }
        await user.save();

        res
          .status(HttpStatusCode.Created)
          .json({ message: message.success.createdMessage("User") });
      } catch (error) {
        console.error("Error creating user:", error);
        res
          .status(HttpStatusCode.InternalServerError)
          .json({ message: message.error[HttpStatusCode.InternalServerError] });
      }
      break;

    default:
      res
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ message: message.error[HttpStatusCode.MethodNotAllowed] });
  }
}
