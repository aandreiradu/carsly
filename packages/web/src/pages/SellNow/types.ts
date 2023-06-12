import { z } from 'zod';

export const sellNowStageOne = z.object({
  year: z.string().min(1, { message: 'Please choose a year' }),
  model: z.string().min(1, { message: 'Please choose a model' }),
});

export type SellNowStageOneProps = z.infer<typeof sellNowStageOne>;
