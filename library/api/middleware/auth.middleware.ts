import { HttpStatusCode } from "./../utils/constants";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const authenticateToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthenticated" });
  if (!process.env.AUTH_SECRET_KEY)
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "No pwd secret keys set up" });

//   jwt.verify(token, process.env.AUTH_SECRET_KEY).;
};
