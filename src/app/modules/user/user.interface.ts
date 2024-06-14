// export type TAddress = {
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
// }

import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'customer';
  address: string;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}


export type TUserRole = keyof typeof USER_ROLE