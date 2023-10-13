import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),

    rating: z.number({
      required_error: 'Rating is required',
    }),

    userId: z.string({
      required_error: 'UserId is required',
    }),

    serviceId: z.string({
      required_error: 'Service is required',
    }),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
};
