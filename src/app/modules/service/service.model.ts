import { Model, Schema, model } from 'mongoose';
import { IService } from './service.interface';

type ServiceModel = Model<IService, Record<string, unknown>>;

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService, ServiceModel>('Service', ServiceSchema);
