// import { Request, Response } from 'express';
// import httpStatus from 'http-status';

// const notFound = (req: Request, res: Response) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     statusCode: 404,
//     message: 'Not Found',
//   });
// };

// export default notFound;



import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "rote not not Found",
    origin: {
      path: req.originalUrl,
      method: req.method,
    },
  });
};