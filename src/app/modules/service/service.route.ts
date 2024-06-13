import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { ServiceSchemaValidations } from './service.validation';
import { ServiceControllers } from './service.controller';


const router = express.Router();

router.post(
  '/create-services',
  validateRequest(
    ServiceSchemaValidations.createServiceSchemaValidation,
  ),
  ServiceControllers.createService,
);

router.get(
  '/:serviceId',
  ServiceControllers.getSingleService,
);

router.patch(
  '/:serviceId',
  validateRequest(
    ServiceSchemaValidations.updateServiceSchemaValidation,
  ),
  ServiceControllers.updateService,
);

router.get('/', ServiceControllers.getAllServices);

router.delete('/:serviceId', ServiceControllers.deleteService);

export const ServiceRoutes = router;
