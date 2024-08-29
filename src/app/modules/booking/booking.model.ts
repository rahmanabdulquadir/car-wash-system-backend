// import { Schema, model } from 'mongoose';
// import { TBooking } from './booking.interface';

// const bookingSchema = new Schema<TBooking>(
//   {
//     // customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
//     slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
//     vehicleType: {
//       type: String,
//       required: true,
//       enum: [
//         'car',
//         'truck',
//         'SUV',
//         'van',
//         'motorcycle',
//         'bus',
//         'electricVehicle',
//         'hybridVehicle',
//         'bicycle',
//         'tractor',
//       ],
//     },
//     vehicleBrand: { type: String, required: true },
//     vehicleModel: { type: String, required: true },
//     manufacturingYear: { type: Number, required: true },
//     registrationPlate: { type: String, required: true },
//   },
//   { timestamps: true },
// );

// export const Booking = model<TBooking>('Booking', bookingSchema);





import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Slot",
    },
    payment: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["cancel", "confirm", "complete"],
      default: "confirm",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;