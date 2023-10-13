import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (review: IReview) => {
  const createReview = await Review.create(review);

  if (!createReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Review');
  }

  return createReview;
};

const getAllReviews = async () => {
  const review = await Review.find({});
  return review;
};

const getSingleReview = async (id: string) => {
  const result = await Review.findOne({ id });
  return result;
};

const updateReview = async (id: string, payload: Partial<IReview>) => {
  const isExist = await Review.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  const result = await Review.findOneAndUpdate({ id }, payload, {
    new: true,
  });

  return result;
};

const deleteReview = async (id: string) => {
  const isExist = await Review.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  //delete student first
  const deletedReview = await Review.findOneAndDelete(
    { id },
    {
      new: true,
    }
  );

  return deletedReview;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
