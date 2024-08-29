// import httpStatus from 'http-status';
// import catchAsync from '../../utils.ts/catchAsync';
// import sendResponse from '../../utils.ts/sendResponse';
// import { UserServices } from './user.service';




// const createUser = catchAsync(async (req, res) => {
//   const result = await UserServices.createUserIntoDB(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User registered successfully',
//     data: result,
//   });

 
// });

// const getAllUsers = catchAsync(async (req, res) => {
//   console.log('test', req.user)
//   const result = await UserServices.getAllUsersFromDB();

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
//     message: 'All the users are retrieved successfully',
//     data: result,
//   });
// });

// const getSingleUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const result = await UserServices.getSingleUserFromDB(userId);

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
//     message: `User (${result?.role}) is retrieved successfully`,
//     data: result,
//   });
// });

// export const UserControllers = {
//   createUser,
//   getAllUsers,
//   getSingleUser,
// };










// // export const signUpHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// //   const { name, email, password, phone, role, address } = req.body;
  
// //   const parsedData = signUpSchema.parse({ name, email, password, phone, role, address });

// //   const user = await createUser(parsedData);

// //   sendResponse(res, {
// //     statusCode: 201,
// //     success: true,
// //     message: 'User registered successfully',
// //     data: user,
// //   });
// // });

// // export const loginHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// //   const { email, password } = req.body;

// //   const parsedData = loginSchema.parse({ email, password });

// //   const user = await loginUser(parsedData.email, parsedData.password);

// //   const token = jwt.sign(
// //     { id: user._id, role: user.role },
// //     config.jwt.secret,
// //     { expiresIn: config.jwt.expiresIn }
// //   );

// //   sendResponse(res, {
// //     statusCode: 200,
// //     success: true,
// //     message: 'User logged in successfully',
// //     token,
// //     data: user,
// //   });
// // });




/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import User from "./user.model";
import sendResponse from "../../utils.ts/sendResponse";
import { sendImageToCloudinary } from "../../utils.ts/uploadFile";
import { catchAsyncError } from "../../utils.ts/catchAsyncError";

export const updateUserProfileImage = catchAsyncError(async (req, res) => {
  const file = req.file;
  const user = req.user as JwtPayload;
  if (!file) {
    return sendResponse(res, {
      message: "file not found",
      success: false,
      data: null,
      statusCode: 404,
    });
  }
  const uploadRes: any = await sendImageToCloudinary(file.filename, file.path);
  const url = uploadRes.secure_url as string;
  if (!url) {
    return sendResponse(res, {
      message: "failed to upload image",
      success: false,
      data: null,
      statusCode: 400,
    });
  }

  const isExistUser = await User.findOne({ email: user.email });
  if (!isExistUser) {
    return sendResponse(res, {
      message: "user not found",
      success: false,
      data: null,
      statusCode: 404,
    });
  }
  const result = await User.findByIdAndUpdate(
    isExistUser._id,
    { image: url },
    { new: true, runValidators: true }
  );

  sendResponse(res, {
    data: result,
    message: "image updated successfully",
    statusCode: 200,
    success: true,
  });
});
export const updateUserInfo = catchAsyncError(async (req, res) => {
  const { body } = req;
  const user = req.user as JwtPayload;
  ["email", "role", "image"].forEach((item) => delete body[item]);

  const isExistUser = await User.findOne({ email: user.email });
  if (!isExistUser) {
    return sendResponse(res, {
      message: "user not found",
      success: false,
      data: null,
      statusCode: 404,
    });
  }

  const result = await User.findByIdAndUpdate(isExistUser._id, body, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, {
    data: result,
    message: "user profile updated successfully",
    statusCode: 200,
    success: true,
  });
});

export const getAllUser = catchAsyncError(async (req, res) => {
  const user = req.user as JwtPayload;

  const query = User.find({ _id: { $ne: user._id } }).populate({
    path: "auth",
    select: "role",
  });

  const build = new QueryBuilder(query, req.query).search([
    "firstName",
    "lastName",
    "email",
  ]);
  const totalDoc = await build.count();
  const result = await build.modelQuery;
  res.json({
    data: result,
    success: true,
    totalDoc: totalDoc.totalCount,
    message: "successfully get all user",
  });
});