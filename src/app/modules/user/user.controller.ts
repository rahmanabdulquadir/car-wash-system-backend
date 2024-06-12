import httpStatus from "http-status";
import catchAsync from "../../utils.ts/catchAsync";
import sendResponse from "../../utils.ts/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
}