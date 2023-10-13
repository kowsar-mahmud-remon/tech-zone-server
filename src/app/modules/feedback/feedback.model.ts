import { Model, Schema, model } from 'mongoose';
import { IFeedback } from './feedback.interface';

type FeedbackModel = Model<IFeedback, Record<string, unknown>>;

const FeedbackSchema = new Schema<IFeedback>(
  {
    feedback: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
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

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  FeedbackSchema
);
