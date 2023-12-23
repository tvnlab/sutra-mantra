import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@library/api/utils/database";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import message from "@library/api/utils/message";
import CloudinaryImageUploader from "@library/api/utils/cloudinary";

const cloudinaryUploader = new CloudinaryImageUploader();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case ApiMethod.POST:
      try {
        const { file } = req.body;

        const cloudinaryUrl = await cloudinaryUploader.uploadImage(file);

        if (!cloudinaryUrl) {
          throw new Error("Error uploading file to Cloudinary");
        }
        res.status(HttpStatusCode.Created).json({ imageUrl: cloudinaryUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
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
