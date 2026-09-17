import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { ApiError } from "../utils/apiError.utils.js";

// Validate Incoming Request By Zod
export const validateRequest =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req: ", req.body);
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      }) as {
        body: any;
        query?: any;
        params?: any;
      };
      req.body = parsed.body ?? req.body;
      res.locals.query = parsed.query ?? req.query;
      res.locals.params = parsed.params ?? req.params;
      console.log("parsed: ", parsed);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.issues);
        const formatted = err.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return next(new ApiError(400, "Validation failed", formatted));
      }
      next(err);
    }
  };
