import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
 
  console.log(result);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.user,
  });
});

export const AuthControllers = {
  loginUser,
};
