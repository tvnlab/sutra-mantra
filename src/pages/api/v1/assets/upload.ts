import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@library/api/utils/database";
import { ApiMethod, HttpStatusCode } from "@library/api/utils/constants";
import message from "@library/api/utils/message";
import CloudinaryImageUploader from "@library/api/utils/cloudinary";
import uploadMiddleware from "@library/api/utils/multer_service";
import { logError } from "@library/api/utils/logger";
import { checkValidToken } from "@library/api/middleware/auth.middleware";

const cloudinaryUploader = new CloudinaryImageUploader();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (![ApiMethod.POST].includes(req.method as ApiMethod)) {
    logError(res, HttpStatusCode.MethodNotAllowed);
  }

  await connectToDatabase();
  checkValidToken(req, res);

  switch (req.method) {
    case ApiMethod.POST:
      try {
        uploadMiddleware(req as any, res as any, async (err) => {
          if (err) {
            console.error("Error uploading file:", err);
            return res
              .status(HttpStatusCode.InternalServerError)
              .json({ message: "Error uploading file" });
          }

          const { file } = req.body;
          const cloudinaryUrl = await cloudinaryUploader.uploadImage(file);

          if (!cloudinaryUrl) {
            throw new Error("Error uploading file to Cloudinary");
          }
          res.status(HttpStatusCode.Created).json({ imageUrl: cloudinaryUrl });
        });
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
