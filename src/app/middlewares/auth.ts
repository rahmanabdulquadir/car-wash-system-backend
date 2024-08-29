// import { NextFunction, Request, Response } from 'express';
// import catchAsync from '../utils.ts/catchAsync';
// import AppError from '../errors/AppError';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/user/user.interface';



// const auth = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//       // const token = req.headers.authorization;
//       const authHeader = req.headers.authorization;
//       const token = authHeader?.split(' ')[1];
//       if (!token) {
//         throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
//       }


    
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//       }
  
    

//       // check if the token is valid

//       jwt.verify(
//         token,
//         config.jwt_access_secret as string,
//         function (err, decoded) {
//           if (err) {
//             throw new AppError(
//               httpStatus.UNAUTHORIZED,
//               'You are not Authorized',
//             );
//           }

//           const role = (decoded as JwtPayload).role

//           if(requiredRoles && !requiredRoles.includes(role)){
//             throw new AppError(
//               httpStatus.UNAUTHORIZED,
//               'You are not Authorized',
//             );
//           }

//           req.user = decoded as JwtPayload;
//           next();
//         },
//       );

      
//     },
//   );
// };

// export default auth;






/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import User from "../modules/user/user.model";
import Authentication from "../modules/Auth/auth.model";

export const isAuthenticatedUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const getToken = req.header("Authorization");

    if (!getToken)
      return res.status(401).json({ message: "Invalid Authentication." });

    const token = getToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );
    // console.log("desss", decoded);

    if (!decoded)
      return res.status(401).json({ message: "Invalid Authentication." });

    const user = await User.findOne({
      auth: decoded?.user?.id,
    });
    if (!user) return res.status(404).json({ message: "User does not exist." });
    const auth = await Authentication.findOne({ email: user.email });
    if (!auth) return res.status(404).json({ message: "User does not exist." });

    // console.log("user =======", user);

    const payload = user.toObject();
    req.user = { ...payload, role: auth.role };

    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export const authorizeRoles = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError(
          403,
          `User type: ${req.user?.role} is not allowed to access this resouce `
        )
      );
    }
    next();
  };
};