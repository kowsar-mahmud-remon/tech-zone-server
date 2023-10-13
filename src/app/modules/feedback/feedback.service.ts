import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';

const createFeedback = async (feedback: IFeedback) => {
  const createFeedback = await Feedback.create(feedback);

  if (!createFeedback) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Feedback');
  }

  return createFeedback;
};

const getAllFeedbacks = async () => {
  const feedback = await Feedback.find({});
  return feedback;
};

const getSingleFeedback = async (id: string) => {
  const result = await Feedback.findOne({ _id: id });
  return result;
};

const updateFeedback = async (id: string, payload: Partial<IFeedback>) => {
  const isExist = await Feedback.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found !');
  }

  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFeedback = async (id: string) => {
  const isExist = await Feedback.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'feedback not found !');
  }

  const deletedFeedback = await Feedback.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedFeedback;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
