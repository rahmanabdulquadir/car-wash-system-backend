import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const addressSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  address: { type: addressSchema, required: true },
});

export const User = model<TUser>('User', userSchema);
