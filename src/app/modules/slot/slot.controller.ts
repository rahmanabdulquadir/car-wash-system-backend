// import { Request, Response } from "express";
// import { SlotServices } from "./slot.service";
// import { slotValidationSchema } from "./slot.validation";
// import sendResponse from "../../utils.ts/sendResponse";

// export const createSlotHandler = async (req: Request, res: Response) => {
//   const validation = slotValidationSchema.safeParse(req.body);
//   if (!validation.success) {
//     return res.status(400).json({ success: false, message: 'Validation failed', errors: validation.error.issues });
//   }

//   const { service, date, startTime, endTime } = validation.data;

//   try {
//     const createdSlots = await SlotServices.createSlotsIntoDB(service, date, startTime, endTime);
//     res.status(201).json({
//       success: true,
//       statusCode: 200,
//       message: 'Slots created successfully',
//       data: createdSlots,
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// export const getAvailableSlotsHandler = async (req: Request, res: Response) => {
//   try {
//     const { date, serviceId } = req.query;
//     const slots = await SlotServices.getAvailableSlotsFromDB({ date: date as string, serviceId: serviceId as string });

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'Available slots retrieved successfully',
//       data: slots,
//     });
//   } catch (error:any) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };






import { catchAsyncError } from "../../utils.ts/catchAsyncError";
import sendResponse from "../../utils.ts/sendResponse";
import Service from "../service/service.model";
import slotService from "./slot.service";

const {
  createSlot,
  getAllAvailableSlotsService,
  getSlotByIdService,
  getAllSlotsService,
  toggleSlotsStuasService,
} = slotService;

export const createSlotsIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;

  const isServiceExist = await Service.findById(body.service);

  if (!isServiceExist) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "There is no available Service on this id. invalid service id",
      data: null,
    });
  }

  const result = await createSlot(body, isServiceExist.duration);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slots created successfully",
    data: result,
  });
});

export const getAllAvailableSlots = catchAsyncError(async (req, res) => {
  const query = req.query;
  const result = await getAllAvailableSlotsService(query);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    message: "No data found",
    data: [],
    success: false,
  });
});
export const getAllSlots = catchAsyncError(async (req, res) => {
  const query = req.query;
  const { result, totalDoc } = await getAllSlotsService(query);
  if (result.length > 0) {
    return res.json({
      success: true,
      data: result,
      totalDoc,
      message: "All slots retrieved successfully",
    });
  }
  sendResponse(res, {
    message: "No data found",
    data: [],
    success: false,
  });
});
export const getSlotById = catchAsyncError(async (req, res) => {
  const result = await getSlotByIdService(req.params.id);

  sendResponse(res, {
    message: "successfylly get slot",
    data: result,
    success: true,
  });
});
export const toggleSlotStatus = catchAsyncError(async (req, res) => {
  const result = await toggleSlotsStuasService(req.params.id);

  if (!result) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Slot not found",
      statusCode: 404,
    });
  }

  sendResponse(res, {
    message: "successfylly updated slot status",
    data: result,
    success: true,
  });
});