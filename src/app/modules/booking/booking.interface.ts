import { Types } from 'mongoose';

export type IBooking = {
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  serviceName: string;
  servicePrice: number;
};
