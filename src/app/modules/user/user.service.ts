import { TUser } from "./user.interface";
import { User } from "./user.model";



const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
}












// import { IUser } from "./user.interface";
// import User from "./user.model";



// export const createUser = async (userData: IUser) => {
//   const user = await User.create(userData);
//   return user;
// };

// export const loginUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email }).select('+password');
//   if (!user || !(await user.correctPassword(password, user.password))) {
//     throw new AppError('Incorrect email or password', 401);
//   }
//   return user;
// };