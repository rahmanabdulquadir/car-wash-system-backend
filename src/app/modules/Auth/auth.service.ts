import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exists!');
  }

  // checking if the password matches (hash pass and client given pass)

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // create token and sent to the client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '15d',
  });

  // Access granted : send AccessToken and RefreshToken.
  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  loginUser,
};
