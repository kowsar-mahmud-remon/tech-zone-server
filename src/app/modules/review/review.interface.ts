import { Types } from 'mongoose';

export type IReview = {
  review: string;
  rating: number;
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
};
