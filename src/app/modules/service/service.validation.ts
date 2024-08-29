// import { z } from 'zod';

// const createServiceSchemaValidation = z.object({
//   body: z.object({
//     name: z.string().nonempty({ message: 'Name is required' }),
//     description: z.string().nonempty({ message: 'Description is required' }),
//     price: z.number({ message: 'Price is required' }),
//     duration: z.number({ message: 'Duration is required' }),
//     isDeleted: z.boolean().default(false),
//   }),
// });

// const updateServiceSchemaValidation = z.object({
//   body: z.object({
//     name: z.string().nonempty({ message: 'Name is required' }).optional(),
//     description: z
//       .string()
//       .nonempty({ message: 'Description is required' })
//       .optional(),
//     price: z.number().optional(),
//     duration: z.number().optional(),
//     isDeleted: z.boolean().default(false).optional(),
//   }),
// });

// export const ServiceSchemaValidations = {
//   createServiceSchemaValidation,
//   updateServiceSchemaValidation,
// };



import { z } from "zod";

const serviceValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  isDeleted: z.boolean(),
});

export const serviceUpdateValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().optional(),
  isDeleted: z.boolean().optional(),
});

export default serviceValidationSchema;