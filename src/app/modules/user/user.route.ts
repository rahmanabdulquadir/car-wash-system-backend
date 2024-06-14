import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', auth(), UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);
export const UserRoutes = router;
