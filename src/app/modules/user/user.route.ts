import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import  {UserValidations} from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(UserValidations.createUserValidationSchema));

export const UserRoutes = router;
