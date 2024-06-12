import { z } from "zod";

// Define the address validation schema
const addressSchema = z.object({
  address: z.string().nonempty({ message: "Address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  postalCode: z.string().nonempty({ message: "Postal code is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
});

// Define the user validation schema
const createUserValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
  address: addressSchema,
});

export const  UserValidations = {
  createUserValidationSchema,
}