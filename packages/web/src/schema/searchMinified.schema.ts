import { z } from 'zod';
import { CountriesTypes, FuelType } from '../pages/SellNow/types';

export const searchMinifiedSchema = z.object({
  brand: z
    .string({
      required_error: 'Please select the brand',
      invalid_type_error: 'Please select a valid brand',
    })
    .min(1),
  model: z
    .string({
      required_error: 'Please select a model',
      invalid_type_error: 'Please select a valid model',
    })
    .nonempty(),

  priceMax: z.number().min(0),

  firstRegister: z.number().min(1900),

  kmMax: z.string().or(z.number()),

  fuel: z.object({
    value: z.nativeEnum(FuelType, {
      description: 'Please select a valid fuel type',
      required_error: 'Please select a fuel type',
      invalid_type_error: 'Please select a valid fuel type',
    }),
    label: z.string(),
  }),

  vehicleOrigin: z.object({
    value: z.nativeEnum(CountriesTypes, {
      description: 'Please select a country',
      required_error: 'Please select a country',
      invalid_type_error: 'Please select a valid country',
    }),
    label: z.string(),
  }),
});

export type SearchMinifiedProps = z.infer<typeof searchMinifiedSchema>;
