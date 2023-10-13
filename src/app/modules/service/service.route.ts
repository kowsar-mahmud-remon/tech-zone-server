import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';
const router = express.Router();

router.post(
  '/create-service',
  validateRequest(ServiceValidation.createServiceZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.createService
);

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ServiceController.getSingleService
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.deleteService
);

router.patch(
  '/:id',
  // validateRequest(StudentValidaion.updateStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.updateService
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ServiceController.getAllService
);

export const ServiceRoutes = router;
