// import { Schema, model } from 'mongoose';
// import { TService } from './service.interface';

// // Mongoose schema for the service
// const serviceSchema = new Schema<TService>(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     duration: { type: Number, required: true },
//     isDeleted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   },
// );

// // Mongoose model
// export const Service = model<TService>('Service', serviceSchema);



import mongoose, { Schema } from "mongoose";
import IService from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;