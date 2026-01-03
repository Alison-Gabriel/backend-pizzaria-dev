import type { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma";

export const validateAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.authUserId;
  const isUserNotAuthenticated = !userId;

  if (isUserNotAuthenticated) {
    return res.status(401).json({
      error: "Unauthenticated.",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: { id: userId },
    select: {
      role: true,
    },
  });
  const isUserNotFounded = !user;

  if (isUserNotFounded) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  const isUserUnauthorized = user.role !== "ADMIN";

  if (isUserUnauthorized) {
    return res.status(403).json({
      error: "Unauthorized.",
    });
  }

  return next();
};
