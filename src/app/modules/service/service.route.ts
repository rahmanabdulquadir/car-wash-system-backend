import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { ServiceSchemaValidations } from './service.validation';
import { ServiceControllers } from './service.controller';


const router = express.Router();

router.post(
  '/create-service',
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
