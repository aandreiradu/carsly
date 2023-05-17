import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name should contain at least 1 character' }),
    lastName: z.string().min(1, { message: 'Last name should contain at least 1 character' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type RegisterProps = z.infer<typeof registerSchema>;
