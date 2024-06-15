import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', auth(), UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);
export const UserRoutes = router;











// const router = Router();

// router.post('/signup', signUpHandler);
// router.post('/login', loginHandler);

// export default router;