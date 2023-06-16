import { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type CheckboxProps = {
  label: string;
  id: string;
  className?: string;
  wrapperClassNames?: string;
  labelClassNames?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, wrapperClassNames, labelClassNames }, ref) => {
    return (
      <div className={`relative flex ${wrapperClassNames}`}>
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            id={id}
            aria-describedby={`${label}-description`}
            name={label}
            type="checkbox"
            className={`${cn('h-8 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600', className)}`}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="comments" className={`font-medium text-gray-900 ${labelClassNames}`}>
            {label}
          </label>{' '}
        </div>
      </div>
    );
  },
);

export default Checkbox;
