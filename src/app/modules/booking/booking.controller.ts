// import httpStatus from 'http-status';
// import catchAsync from '../../utils.ts/catchAsync';
// import sendResponse from '../../utils.ts/sendResponse';
// import { BookingServices } from './booking.service';
// import { Request, Response } from 'express';
// import { User } from '../user/user.model';
// import { Service } from '../service/service.model';
// import { Slot } from '../slot/slot.model';

// const createBooking = catchAsync(async (req, res) => {
//   const result = await BookingServices.createBookingIntoDB(req.body);
//   // console.log(req?.user?.userEmail);
//   const userEmail = req?.user?.userEmail
//   const user: any = await User.findOne({email: userEmail})
//   console.log(user)
//   // console.log(result);
//   const ultimateResult = {...user._doc, result}
//   console.log(ultimateResult)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking successful',
//     data: ultimateResult,
//   });
//   // console.log(result)
// });

// const getAllBookings = catchAsync(async (req, res) => {
//   const result = await BookingServices.getAllBookingsFromDB();

//   if (!result.length) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All bookings retrieved successfully',
//     data: result,
//   });
// });

// export const BookingControllers = {
//   createBooking,
//   getAllBookings,
// };




import { isValidObjectId } from "mongoose";
import { IPaymentPayload } from "../payment/payment.interface";
import { initiatePayment } from "../payment/payment.utils";
import Service from "../service/service.model";
import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import { bookingService } from "./booking.service";
import { catchAsyncError } from "../../utils.ts/catchAsyncError";
import sendResponse from "../../utils.ts/sendResponse";

const { createBookingService, getAllBookingService, getUserBookingsService } =
  bookingService;

export const createBookingIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;

  const user = req.user;
  const isValidObjId = isValidObjectId(body.service);
  if (!isValidObjId) {
    return sendResponse(res, {
      data: null,
      message: "invalid object id format",
      success: false,
      statusCode: 400,
    });
  }

  const isExistService = await Service.findById(body.service);
  if (!isExistService) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }
  const slot = await Slot.findById(body.slot);
  if (!slot) {
    return sendResponse(res, {
      message: "slot not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  if (slot.isBooked !== "available") {
    sendResponse(res, {
      message: "this slot is not available for booking",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const data: IBooking = {
    customer: user._id,
    service: body.service,
    slot: body.slot,
    ...body,
  };

  await createBookingService(data);

  const paymentPayload: IPaymentPayload = {
    amount: isExistService.price,
    cus_add: user.address,
    cus_email: user.email,
    cus_name: user.firstName + user.lastName,
    cus_phone: user.phone,
    tran_id: `TXN-${Date.now()}`,
  };
  const paymentResponse = await initiatePayment(
    paymentPayload,
    slot._id.toString()
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: paymentResponse,
  });
});

export const getAllBookings = catchAsyncError(async (req, res) => {
  const { result, totalDoc } = await getAllBookingService(req.query);

  if (result.length > 0) {
    return res.json({
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: result,
      totalDoc,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});

export const getUserBookings = catchAsyncError(async (req, res) => {
  const user = req.user;
  const result = await getUserBookingsService(user._id, req.query);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
  });
});