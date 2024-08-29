// import { z } from "zod";

// export const slotValidationSchema = z.object({
//   service: z.string(),
//   date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
//   startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format'),
//   endTime: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format'),
// });

// export const SlotValidations = {
//   slotValidationSchema,
// } 



import { z } from "zod";

// Regex for HH:mm format validation
const timeFormat = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

const BookingSchema = z
  .object({
    service: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    date: z.date(),
    startTime: z
      .string()
      .regex(timeFormat, "Invalid time format")
      .refine((val) => {
        const [hours, minutes] = val.split(":").map((e) => Number(e));
        return hours < 24 && minutes < 60;
      }, "Invalid time"),
    endTime: z
      .string()
      .regex(timeFormat, "Invalid time format")
      .refine((val) => {
        const [hours, minutes] = val.split(":").map((e) => Number(e));
        return hours < 24 && minutes < 60;
      }, "Invalid time"),
    isBooked: z.enum(["available", "booked", "canceled"]),
  })
  .refine(
    (data) => {
      const [startH, startM] = data.startTime.split(":").map((e) => Number(e));
      const [endH, endM] = data.endTime.split(":").map((e) => Number(e));
      return startH < endH || (startH === endH && startM < endM);
    },
    {
      message: "startTime must be earlier than endTime",
      path: ["startTime"],
    }
  );

export type IBooking = z.infer<typeof BookingSchema>;