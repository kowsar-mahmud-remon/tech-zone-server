import { Types } from 'mongoose';

export type IFeedback = {
  feedback: string;
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
};
