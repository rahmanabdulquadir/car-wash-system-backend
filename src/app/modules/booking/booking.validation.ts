import { z } from "zod";

const createBookingValidationSchema = z.object({
  customer: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid customer ID format'), // ObjectId validation
  service: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid service ID format'), // ObjectId validation
  slot: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid slot ID format'), // ObjectId validation
  vehicleType: z.enum([
    'car',
    'truck',
    'SUV',
    'van',
    'motorcycle',
    'bus',
    'electricVehicle',
    'hybridVehicle',
    'bicycle',
    'tractor',
  ]),
  vehicleBrand: z.string().nonempty('Vehicle brand is required'),
  vehicleModel: z.string().nonempty('Vehicle model is required'),
  manufacturingYear: z.number().int().gte(1886, 'Invalid manufacturing year'), // considering the first car was invented in 1886
  registrationPlate: z.string().nonempty('Registration plate is required'),
});

export const BookingValidations ={
  createBookingValidationSchema,
}