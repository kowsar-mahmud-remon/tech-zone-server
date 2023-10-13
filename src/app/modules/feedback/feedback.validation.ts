import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    feedback: z.string({
      required_error: 'Feedback is required',
    }),

    userId: z.string({
      required_error: 'UserId is required',
    }),

    serviceId: z.string({
      required_error: 'Service is required',
    }),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
};
