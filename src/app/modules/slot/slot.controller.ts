import { Request, Response } from "express";
import { SlotServices } from "./slot.service";
import { slotValidationSchema } from "./slot.validation";
import sendResponse from "../../utils.ts/sendResponse";

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



export const getAvailableSlotsHandler = async (req: Request, res: Response) => {
  try {
    const { date, serviceId } = req.query;
    const slots = await SlotServices.getAvailableSlotsFromDB({ date: date as string, serviceId: serviceId as string });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Available slots retrieved successfully',
      data: slots,
    });
  } catch (error:any) {
    res.status(400).json({ success: false, message: error.message });
  }
};