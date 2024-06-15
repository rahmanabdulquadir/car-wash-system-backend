import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const {
    // customer,
    service,
    slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;
  // console.log( service, slot);

  // const userEmail = payload?.userEmail;

  // const isCustomerExits = await User.findOne({ email: userEmail });
  // if (!isCustomerExits) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  // }
  // const user = User.isUserExistsByEmail()
  // console.log(user)

  const isServiceExits = await Service.findById(service).populate('service');
  if (!isServiceExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found !');
  }
  const isSlotExits = await Slot.findById(slot).populate('slot');
  if (!isSlotExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found !');
  }

  const result = await Booking.create({
    ...payload,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  });
  // console.log(result)
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('service').populate('slot');
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
