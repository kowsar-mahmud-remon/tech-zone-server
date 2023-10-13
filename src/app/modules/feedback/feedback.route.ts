import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';
const router = express.Router();

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  FeedbackController.getSingleFeedback
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  FeedbackController.getAllFeedbacks
);

router.post(
  '/create-feedback',
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.createFeedback
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FeedbackController.deleteFeedback
);

router.patch(
  '/:id',
  // validateRequest(StudentValidaion.updateStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.updateFeedback
);

export const FeedbackRoutes = router;
