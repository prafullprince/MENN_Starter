import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { IUserPayload } from "../types/http/index.js";

// Auth Middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Header is missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify token
    const decode = jwt.verify(token, process.env.access_secret!);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = decode as IUserPayload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Internal server error",
    });
  }
};
