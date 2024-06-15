import { z } from 'zod';

// Define the address validation schema
// const addressSchema = z.object({
//   address: z.string().nonempty({ message: "Address is required" }),
//   city: z.string().nonempty({ message: "City is required" }),
//   postalCode: z.string().nonempty({ message: "Postal code is required" }),
//   country: z.string().nonempty({ message: "Country is required" }),
// });

// Define the user validation schema
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    phone: z.string().nonempty({ message: 'Phone number is required' }),
    role: z.enum(['admin', 'customer'], {
      message: "Role must be either 'admin' or 'user'",
    }),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};











// import { z } from 'zod';

// export const signUpSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string().min(6),
//   phone: z.string(),
//   role: z.enum(['admin', 'user']),
//   address: z.string(),
// });

// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });