import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      default: 'available',
      enum: ['available', 'booked', 'canceled'],
    },
  },
  { timestamps: true },
);

export const Slot = model<TSlot>('Slot', slotSchema);
