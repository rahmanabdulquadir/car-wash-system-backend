/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Response } from 'express';

// type TResponse<T> = {
//   accessToken?: string
//   statusCode: number
//   success: boolean
//   message?: string
//   data: T
// }

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data?.statusCode).json({
//     success: data.success,
//     statusCode: data?.statusCode,
//     message: data.message,
//     token: data.accessToken,
//     data: data.data,
//   })
// }

// export default sendResponse;


import { Response } from "express";

type IResponse<T> = {
  statusCode?: number;
  success: boolean;
  message?: string;
  data: T;
  error?: any;
};

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode || 200).json({
    success: data.success,
    statusCode: data.statusCode || 200,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;