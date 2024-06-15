import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceSchemaValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/services',
  auth(USER_ROLE.admin),
  validateRequest(ServiceSchemaValidations.createServiceSchemaValidation),
  ServiceControllers.createService,
);

router.get('/services', ServiceControllers.getAllServices);

router.get('/services/:id', ServiceControllers.getSingleService);

router.patch(
  '/services/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceSchemaValidations.updateServiceSchemaValidation),
  ServiceControllers.updateService,
);

router.delete('/services/:id', auth(USER_ROLE.admin), ServiceControllers.deleteService);

export const ServiceRoutes = router;
