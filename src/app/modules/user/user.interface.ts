// import { Model } from 'mongoose';
// import { USER_ROLE } from './user.constant';

// export interface TUser {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   role: 'admin' | 'user';
//   address: string;
// }

// export interface UserModel extends Model<TUser> {
//   isUserExistsByEmail(email: string): Promise<TUser>;

//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
// }

// export type TUserRole = keyof typeof USER_ROLE;
