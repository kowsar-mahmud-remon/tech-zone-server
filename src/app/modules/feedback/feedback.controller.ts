import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFeedback } from './feedback.interface';
import { FeedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const feedback = req.body;
  const result = await FeedbackService.createFeedback(feedback);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully!',
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const allFeedback = await FeedbackService.getAllFeedbacks();

  if (!allFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Feedback');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback fetched successfully !',
    data: allFeedback,
  });
});

const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const getFeedback = await FeedbackService.getSingleFeedback(id);

  if (!getFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Feedback');
  }

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback fetched successfully !',
    data: getFeedback,
  });
});

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedFeedback = await FeedbackService.updateFeedback(id, updatedData);

  if (!updatedFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Feedback');
  }

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully !',
    data: updatedFeedback,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedFeedback = await FeedbackService.deleteFeedback(id);

  if (!deletedFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Feedback');
  }

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully !',
    data: deletedFeedback,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
