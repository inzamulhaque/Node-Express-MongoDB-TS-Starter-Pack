import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TAuthUserRole } from "../interface/auth";
import Demo from "../modules/demo/demo.model";

const auth = (...requiredRoles: TAuthUserRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    // checking if the user is exist
    const user = await Demo.find(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
