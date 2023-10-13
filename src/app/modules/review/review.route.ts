import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.createReview
);

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ReviewController.getSingleReview
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ReviewController.deleteReview
);

router.patch(
  '/:id',
  // validateRequest(StudentValidaion.updateStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.updateReview
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ReviewController.getAllReviews
);

export const ReviewRoutes = router;
