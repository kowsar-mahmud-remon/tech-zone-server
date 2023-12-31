import { z } from 'zod';

export const roleEnum = ['admin'];

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    email: z.string({
      required_error: 'Email is required',
    }),

    password: z.string({
      required_error: 'Password is required',
    }),

    imgUrl: z.string({
      required_error: 'Img Url is required',
    }),

    role: z.enum([...roleEnum] as [string, ...string[]]),

    contactNo: z.string({
      required_error: 'Contact No is required',
    }),

    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
