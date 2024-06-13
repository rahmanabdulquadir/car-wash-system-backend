import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

// Mongoose schema for the service
const serviceSchema = new Schema<TService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Mongoose model
export const Service = model<TService>('Service', serviceSchema);
