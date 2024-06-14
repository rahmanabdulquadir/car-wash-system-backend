import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { ServiceSchemaValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post(
  '/create-service',
  auth(USER_ROLE.admin),
  validateRequest(
    ServiceSchemaValidations.createServiceSchemaValidation,
  ),
  ServiceControllers.createService,
);

router.get('/', ServiceControllers.getAllServices);

router.get(
  '/:id',
  ServiceControllers.getSingleService,
);

router.patch(
  '/:id',
  validateRequest(
    ServiceSchemaValidations.updateServiceSchemaValidation,
  ),
  ServiceControllers.updateService,
);

router.delete('/:id', ServiceControllers.deleteService);



export const ServiceRoutes = router;
