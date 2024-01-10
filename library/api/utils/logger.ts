import { NextApiResponse } from "next";
import { HttpStatusCode } from "./constants";
import message from "./message";
export const logError = (
  res: NextApiResponse<any>,
  code: HttpStatusCode,
  model = ""
) => {
  return res.status(code).json({
    message: !model
      ? (message.error?.[code] as string)
      : (message.error[code](model) as string),
  });
};
