import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }),

    serviceId: z.string({
      required_error: 'Service is required',
    }),
  }),
});

export const BookingValidation = {
  createBookingSchema,
};
