import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues.map((issue) => ({
            message: issue.message,
          })),
        });
      }

      console.log(error);

      return res.status(500).json({ message: "Validation server error" });
    }
  };
