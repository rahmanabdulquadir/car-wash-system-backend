// import httpStatus from "http-status";
// import catchAsync from "../../utils.ts/catchAsync";
// import sendResponse from "../../utils.ts/sendResponse";
// import { ServiceBasedServices } from "./service.service";

// const createService = catchAsync(async (req, res) => {
//   const result = await ServiceBasedServices.createServiceIntoDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `Service created successfully`,
//     data: result,
//   });
// });

// const getAllServices = catchAsync(async (req, res) => {
//   const result = await ServiceBasedServices.getAllServicesFromDB();

//   if (!result.length) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Services retrieved successfully',
//     data: result,
//   });
// });

// const getSingleService = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await ServiceBasedServices.getSingleServiceFromDB(id);
 
//   if (!result) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Service retrieved successfully',
//     data: result,
//   });
// });

// const updateService = catchAsync(async (req, res) => {
//   const  {id}  = req.params;
//   const result = await ServiceBasedServices.updateServiceIntoDB(id, req.body);
  

//   if (!result) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Service updated successfully',
//     data: result,
//   });
// });

// const deleteService = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await ServiceBasedServices.deleteServiceFromDB(id);

//    if (!result) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Service deleted successfully",
//     data: result,
//   });
// });


// export const ServiceControllers = {
//   createService,
//   getAllServices,
//   getSingleService,
//   updateService,
//   deleteService,
// }


import { isValidObjectId } from "mongoose";

import Service from "./service.model";
import servicesService from "./service.service";
import { catchAsync } from "../../utils.ts/catchAsync";
import sendResponse from "../../utils.ts/sendResponse";

const {
  createService,
  getSingleService,
  getAllServices,
  updateSingleService,
  deleteSingleService,
  getAllServiceName,
} = servicesService;

export const createServiceIntoDB = catchAsync(async (req, res) => {
  const { body } = req;
  const result = await createService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const getAllServiceNames = catchAsync(async (req, res) => {
  const result = await getAllServiceName();
  sendResponse(res, {
    message: "Successfully get all service names",
    data: result,
    statusCode: 200,
    success: true,
  });
});

export const getServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }

  const result = await getSingleService(id);
  if (!result) {
    sendResponse(res, {
      message: "No data found",
      data: null,
      success: false,
      statusCode: 404,
    });
  }

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
  });
});

export const getAllServiceFromDB = catchAsync(async (req, res) => {
  const result = await getAllServices(req.query);
  if (result.result.length > 0) {
    return res.json({
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: result.result,
      totalDoc: result.totalDoc,
    });
  }
  res.json({
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
    totalDoc: 0,
  });
});

export const updateServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await updateSingleService(id, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
export const deleteServiceById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await deleteSingleService(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});