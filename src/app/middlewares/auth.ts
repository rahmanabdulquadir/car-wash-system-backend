import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils.ts/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }

    // check if the token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
        }
        const {userEmail, role} = decoded
      },
    );

    next();
  });
};

export default auth;
