import { Request, Response } from "express";
import { SlotServices } from "./slot.service";
import { slotValidationSchema } from "./slot.validation";

export const createSlotHandler = async (req: Request, res: Response) => {
  const validation = slotValidationSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: validation.error.issues });
  }

  const { service, date, startTime, endTime } = validation.data;

  try {
    const createdSlots = await SlotServices.createSlotsIntoDB(service, date, startTime, endTime);
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: 'Slots created successfully',
      data: createdSlots,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};