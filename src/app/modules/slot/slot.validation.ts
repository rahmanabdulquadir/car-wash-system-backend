import { z } from "zod";

export const slotValidationSchema = z.object({
  service: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format'),
});

export const SlotValidations = {
  slotValidationSchema,
} 