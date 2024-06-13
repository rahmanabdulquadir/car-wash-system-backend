import httpStatus from "http-status";
import catchAsync from "../../utils.ts/catchAsync";
import sendResponse from "../../utils.ts/sendResponse";
import { ServiceBasedServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceBasedServices.createServiceIntoDB(req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service named ${result.name} is created successfully`,
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceBasedServices.getAllServicesFromDB();
  console.log(result);

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
    message: 'All the services are retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await ServiceBasedServices.getSingleServiceFromDB(userId);

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
    message: `Service named (${result?.name}) is retrieved successfully`,
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceBasedServices.updateServiceIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceBasedServices.deleteServiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is deleted successfully",
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