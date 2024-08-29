// import httpStatus from 'http-status';
// import AppError from '../../errors/AppError';
// import { User } from '../user/user.model';
// import { TBooking } from './booking.interface';
// import { Booking } from './booking.model';
// import { Service } from '../service/service.model';
// import { Slot } from '../slot/slot.model';

// const createBookingIntoDB = async (payload: TBooking) => {
//   const {
//     // customer,
//     service,
//     slot,
//     vehicleType,
//     vehicleBrand,
//     vehicleModel,
//     manufacturingYear,
//     registrationPlate,
//   } = payload;
//   // console.log( service, slot);

//   // const userEmail = payload?.userEmail;

//   // const isCustomerExits = await User.findOne({ email: userEmail });
//   // if (!isCustomerExits) {
//   //   throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
//   // }
//   // const user = User.isUserExistsByEmail()
//   // console.log(user)

//   const isServiceExits = await Service.findById(service).populate('service');
//   if (!isServiceExits) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Service not found !');
//   }
//   const isSlotExits = await Slot.findById(slot).populate('slot');
//   if (!isSlotExits) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Slot not found !');
//   }

//   const result = await Booking.create({
//     ...payload,
//     vehicleType,
//     vehicleBrand,
//     vehicleModel,
//     manufacturingYear,
//     registrationPlate,
//   });
//   // console.log(result)
//   return result;
// };

// const getAllBookingsFromDB = async () => {
//   const result = await Booking.find().populate('service').populate('slot');
//   return result;
// };

// export const BookingServices = {
//   createBookingIntoDB,
//   getAllBookingsFromDB,
// };




import QueryBuilder from "../../builder/QueryBuilder";
import { IAnyObject } from "../../interface/error";
import Slot from "../slot/slot.model";
import { IBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingService = async (payload: IBooking) => {
  const create = await Booking.create(payload);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const update = await Slot.findByIdAndUpdate(payload.slot, {
    isBooked: "booked",
  });

  const result = await Booking.findById(create._id)
    .populate("service")
    .populate("slot")
    .populate("customer");

  return result;
};

const getAllBookingService = async (query: IAnyObject) => {
  const find = Booking.find()
    .sort("-createdAt")
    .populate("service")
    .populate("slot")
    .populate("customer");
  const queryBuilder = new QueryBuilder(find, query).filter().paginate();
  const totalDoc = await queryBuilder.count();
  const result = await queryBuilder.modelQuery;
  return { result, totalDoc: totalDoc.totalCount };
};

const getUserBookingsService = async (userId: string, query: IAnyObject) => {
  const model = Booking.find({ customer: userId })
    .populate("service")
    .populate("slot")
    .populate("customer");

  const queryBuild = new QueryBuilder(model, query).filter();
  const result = await queryBuild.modelQuery;

  return result;
};

export const bookingService = {
  createBookingService,
  getAllBookingService,
  getUserBookingsService,
};
