import { z } from 'zod';

export const forgotPasswordRequestTokenSchema = z.object({
  email: z.string().email({ message: 'Incorrect email format' }).min(1, { message: 'Email required' }),
});

export const forgotPasswordSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be atleast 6 characters' })
      .max(35, { message: 'Password must be shorter than or equal to 35 characters' }),
    confirmPassword: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Confirm Password is required' })
      .max(35, { message: 'Confirm password must be shorter than or equal to 35 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type ForgotPasswordRequestTokenSchema = z.infer<typeof forgotPasswordRequestTokenSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
