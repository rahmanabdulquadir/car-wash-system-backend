import { z } from 'zod';


const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    phone: z.string().nonempty({ message: 'Phone number is required' }),
    role: z.enum(['admin', 'user'], {
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
