import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBlog } from './blog.interface';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = req.body;
  const result = await BlogService.createBlog(blog);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const allBlogs = await BlogService.getAllBlogs();

  if (!allBlogs) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Blogs');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully !',
    data: allBlogs,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleBlog = await BlogService.getSingleBlog(id);

  if (!singleBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get blog');
  }

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully !',
    data: singleBlog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedBlog = await BlogService.updateBlog(id, updatedData);

  if (!updatedBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Blog');
  }

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully !',
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedBlog = await BlogService.deleteBlog(id);

  if (!deletedBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete blog');
  }

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully !',
    data: deletedBlog,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
