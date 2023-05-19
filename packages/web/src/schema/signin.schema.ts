import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email({ message: 'Incorrect email format' }).min(1, { message: 'Email required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' })
    .max(35, { message: 'Password must be shorter than or equal to 35 characters' }),
});

export type SignInProps = z.infer<typeof signinSchema>;
