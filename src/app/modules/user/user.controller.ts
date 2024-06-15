import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { UserServices } from './user.service';




const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });

 
});

const getAllUsers = catchAsync(async (req, res) => {
  console.log('test', req.user)
  const result = await UserServices.getAllUsersFromDB();

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
    message: 'All the users are retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);

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
    message: `User (${result?.role}) is retrieved successfully`,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};










// export const signUpHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { name, email, password, phone, role, address } = req.body;
  
//   const parsedData = signUpSchema.parse({ name, email, password, phone, role, address });

//   const user = await createUser(parsedData);

//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: 'User registered successfully',
//     data: user,
//   });
// });

// export const loginHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;

//   const parsedData = loginSchema.parse({ email, password });

//   const user = await loginUser(parsedData.email, parsedData.password);

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     config.jwt.secret,
//     { expiresIn: config.jwt.expiresIn }
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully',
//     token,
//     data: user,
//   });
// });
