import httpStatus from "http-status";
import catchAsync from "../../utils.ts/catchAsync";
import sendResponse from "../../utils.ts/sendResponse";
import { ServiceBasedServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceBasedServices.createServiceIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service created successfully`,
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceBasedServices.getAllServicesFromDB();

  if (!result.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceBasedServices.getSingleServiceFromDB(id);
 
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const  {id}  = req.params;
  const result = await ServiceBasedServices.updateServiceIntoDB(id, req.body);
  

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceBasedServices.deleteServiceFromDB(id);

   if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});


export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
}