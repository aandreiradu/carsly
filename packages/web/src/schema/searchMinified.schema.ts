import { z } from 'zod';
import { CountriesTypes, FuelType } from '../pages/SellNow/types';

export const searchMinifiedSchema = z.object({
  brand: z.object(
    {
      value: z.coerce.string({
        description: 'Please select a brand',
        required_error: 'Please select a brand',
        invalid_type_error: 'Please select a brand',
      }),
      label: z.string(),
    },
    { required_error: 'Please select a brand' },
  ),

  model: z
    .object(
      {
        value: z.coerce.string({
          description: 'Please select a model',
          required_error: 'Please select a model',
          invalid_type_error: 'Please select a model',
        }),
        label: z.string(),
      },
      { required_error: 'Please select a model' },
    )
    .optional(),

  priceUpTo: z.coerce.number().optional(),

  year: z
    .object({
      value: z.coerce.number().min(1900),
      label: z.coerce.number().min(1900),
    })
    .optional(),

  kmUpTo: z
    .string()
    .or(z.number().min(0, { message: 'KM should be greater than 0' }))
    .optional(),

  fuel: z
    .object({
      value: z.nativeEnum(FuelType, {
        description: 'Please select a valid fuel type',
        required_error: 'Please select a fuel type',
        invalid_type_error: 'Please select a valid fuel type',
      }),
      label: z.string(),
    })
    .optional(),

  vehicleOrigin: z
    .object({
      value: z.nativeEnum(CountriesTypes, {
        description: 'Please select a country',
        required_error: 'Please select a country',
        invalid_type_error: 'Please select a valid country',
      }),
      label: z.string(),
    })
    .optional(),
});

export type SearchMinifiedSchema = z.infer<typeof searchMinifiedSchema>;
