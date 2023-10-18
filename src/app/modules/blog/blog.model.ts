import { Model, Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

type BlogModel = Model<IBlog, Record<string, unknown>>;

const BlogSchema = new Schema<IBlog>(
  {
    title: {
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

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);
