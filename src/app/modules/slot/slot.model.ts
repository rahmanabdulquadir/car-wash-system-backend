// // import { Schema, model } from 'mongoose';
// // import { TSlot } from './slot.interface';

// // const slotSchema = new Schema<TSlot>(
// //   {
// //     service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
// //     date: { type: String, required: true },
// //     startTime: { type: String, required: true },
// //     endTime: { type: String, required: true },
// //     isBooked: {
// //       type: String,
// //       default: 'available',
// //       enum: ['available', 'booked', 'canceled'],
// //     },
// //   },
// //   { timestamps: true },
// // );

// // export const Slot = model<TSlot>('Slot', slotSchema);




// import mongoose, { Schema } from "mongoose";
// import ISlot from "./slot.interface";

// const bookingSchema = new Schema<ISlot>(
//   {
//     service: {
//       type: Schema.Types.ObjectId,
//       ref: "Service",
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     startTime: {
//       type: String,
//       required: true,
//     },
//     endTime: {
//       type: String,
//       required: true,
//     },
//     isBooked: {
//       type: String,
//       enum: ["available", "booked", "canceled"],
//       default: "available",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Slot = mongoose.model("Slot", bookingSchema);
// export default Slot;




import mongoose, { Schema } from "mongoose";
import ISlot from "./slot.interface";

const bookingSchema = new Schema<ISlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", bookingSchema);
export default Slot;