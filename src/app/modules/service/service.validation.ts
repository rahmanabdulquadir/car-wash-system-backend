import { z } from "zod";

const createServiceSchemaValidation = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  price: z.string().nonempty({ message: 'Price is required' }),
  duration: z.string().nonempty({ message: 'Duration is required' }),
  isDeleted: z.boolean().default(false),
});


const updateServiceSchemaValidation = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).optional(),
  description: z.string().nonempty({ message: 'Description is required' }).optional(),
  price: z.string().nonempty({ message: 'Price is required' }).optional(),
  duration: z.string().nonempty({ message: 'Duration is required' }).optional(),
  isDeleted: z.boolean().default(false).optional(),
})


export const ServiceSchemaValidations = {
  createServiceSchemaValidation,
  updateServiceSchemaValidation
}