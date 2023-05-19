import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'First name should contain at least 1 character' })
      .max(20, { message: 'First Name must be shorter than or equal to 20 characters' }),
    lastName: z
      .string()
      .min(1, { message: 'Last name should contain at least 1 character' })
      .max(20, { message: 'Last Name must be shorter than or equal to 20 characters' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' })
      .max(35, { message: 'Password must be shorter than or equal to 35 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password is required' })
      .max(35, { message: 'Confirm password must be shorter than or equal to 35 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type RegisterProps = z.infer<typeof registerSchema>;
