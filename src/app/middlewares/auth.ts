import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils.ts/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';



const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // const token = req.headers.authorization;
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }


    
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
  
    

      // check if the token is valid

      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not Authorized',
            );
          }

          const role = (decoded as JwtPayload).role

          if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not Authorized',
            );
          }

          req.user = decoded as JwtPayload;
          next();
        },
      );

      
    },
  );
};

export default auth;
