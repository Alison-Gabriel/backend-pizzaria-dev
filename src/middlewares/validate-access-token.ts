import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface AccessTokenPayload {
  sub: string;
}

export const validateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  const hasNotUserAuthenticated = !accessToken;

  if (hasNotUserAuthenticated) {
    return res.status(401).json({
      error: "Required access token has not receveid.",
    });
  }

  const authToken = accessToken.split(" ")[1];

  try {
    const { sub: userId } = verify(
      String(authToken),
      String(process.env.JWT_SECRET)
    ) as AccessTokenPayload;

    req.authUserId = userId;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid access token.",
    });
  }
};
