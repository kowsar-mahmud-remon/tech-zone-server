import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    imgUrl: z.string({
      required_error: 'Img Url is required',
    }),

    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
};
