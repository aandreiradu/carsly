import { forwardRef } from 'react';
import { cn } from '../../../utils/styling.utils';

type CheckboxProps = {
  label: string;
  id: string;
  className?: string;
  wrapperClassNames?: string;
  labelClassNames?: string;
  onChange?: any;
  error?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, wrapperClassNames, labelClassNames, error, ...props }, ref) => {
    return (
      <>
        <div className={`relative rounded-lg flex ${wrapperClassNames} ${error && 'border-red-500'}`}>
          <div className="flex h-6 items-center">
            <input
              ref={ref}
              id={id}
              aria-describedby={`${label}-description`}
              name={label}
              type="checkbox"
              className={`${cn('h-8 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600', className)}`}
              {...props}
            />
          </div>
          <label
            htmlFor={id}
            className={`ml-3 text-sm leading-6 font-medium text-gray-900 ${labelClassNames} ${error && 'text-red-500'}`}
          >
            {label}
          </label>
        </div>
        {error && <span className="text-red-500 text-sm ">{error}</span>}
      </>
    );
  },
);

export default Checkbox;
