import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;
  const result = await ReviewService.createReview(review);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const allUReviews = await ReviewService.getAllReviews();

  if (!allUReviews) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Reviews');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully !',
    data: allUReviews,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const allReview = await ReviewService.getSingleReview(id);

  if (!allReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Review');
  }

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully !',
    data: allReview,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedReview = await ReviewService.updateReview(id, updatedData);

  if (!updatedReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Review');
  }

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully !',
    data: updatedReview,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedReview = await ReviewService.deleteReview(id);

  if (!deletedReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Review');
  }

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully !',
    data: deletedReview,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
