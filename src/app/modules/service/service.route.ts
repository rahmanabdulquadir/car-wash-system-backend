// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { ServiceSchemaValidations } from './service.validation';
// import { ServiceControllers } from './service.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';

// const router = express.Router();

// router.post(
//   '/services',
//   auth(USER_ROLE.admin),
//   validateRequest(ServiceSchemaValidations.createServiceSchemaValidation),
//   ServiceControllers.createService,
// );

// router.get('/services', ServiceControllers.getAllServices);

// router.get('/services/:id', ServiceControllers.getSingleService);

// router.patch(
//   '/services/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(ServiceSchemaValidations.updateServiceSchemaValidation),
//   ServiceControllers.updateService,
// );

// router.delete('/services/:id', auth(USER_ROLE.admin), ServiceControllers.deleteService);

// export const ServiceRoutes = router;



import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";

import {
  createServiceIntoDB,
  deleteServiceById,
  getAllServiceFromDB,
  getAllServiceNames,
  getServiceById,
  updateServiceById,
} from "./service.controller";
import serviceValidationSchema from "./service.validation";
import { validSchema } from "../../middlewares/validator";
const router = Router();
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  validSchema(serviceValidationSchema),
  createServiceIntoDB
);

router.get("/", getAllServiceFromDB);
router.get(
  "/g/names",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllServiceNames
);
router.get("/:id", getServiceById);
router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateServiceById
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteServiceById
);

const serviceRoutes = router;

export default serviceRoutes;