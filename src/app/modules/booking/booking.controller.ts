import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { BookingServices } from './booking.service';
import { Request, Response } from 'express';
import { User } from '../user/user.model';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  // console.log(req?.user?.userEmail);
  const userEmail = req?.user?.userEmail
  const user: any = await User.findOne({email: userEmail})
  console.log(user)
  // console.log(result);
  const ultimateResult = {...user._doc, result}
  console.log(ultimateResult)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: ultimateResult,
  });
  // console.log(result)
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  if (!result.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
