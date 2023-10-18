import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
const router = express.Router();

router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  BlogController.getSingleBlog
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  BlogController.getAllBlogs
);

router.post(
  '/create-blog',
  validateRequest(BlogValidation.createBlogZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.createBlog
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteBlog
);

router.patch(
  '/:id',
  // validateRequest(StudentValidaion.updateStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.updateBlog
);

export const BlogRoutes = router;
