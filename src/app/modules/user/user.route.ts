// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidations } from './user.validation';
// import { UserControllers } from './user.controller';
// import auth from '../../middlewares/auth';

// const router = express.Router();

// router.post(
//   '/signup',
//   validateRequest(UserValidations.createUserValidationSchema),
//   UserControllers.createUser,
// );

// router.get('/', auth(), UserControllers.getAllUsers);

// router.get('/:userId', UserControllers.getSingleUser);
// export const UserRoutes = router;

import { Router } from 'express';

import { authorizeRoles, isAuthenticatedUser } from '../../middlewares/auth';
import {
  getAllUser,
  updateUserInfo,
  updateUserProfileImage,
} from './user.controller';
import { upload } from '../../utils.ts/uploadFile';

const router = Router();
router.get('/all', isAuthenticatedUser, authorizeRoles('admin'), getAllUser);
router.put('/update', isAuthenticatedUser, updateUserInfo);
router.put(
  '/update-profile-image',
  isAuthenticatedUser,
  upload.single('file'),
  updateUserProfileImage,
);
const userRoute = router;
export default userRoute;
