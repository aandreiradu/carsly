import { UseFormProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf, ZodSchema } from 'zod';

interface UseZodFormProps<T extends ZodSchema> extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export const useZodForm = <T extends ZodSchema>({ schema, ...props }: UseZodFormProps<T>) => {
  return useForm({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    ...props,
  });
};
