import { forwardRef, useId } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import Label from '../Label/label.component';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  labelClasses?: string;
  error?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelClasses, label, type, error, className, value, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && (
          <Label htmlFor={id} className={`text-sm ${labelClasses} ${classNames(error ? '!text-red-500' : '')}`}>
            {label}
          </Label>
        )}
        <input
          ref={ref}
          id={id}
          className={classNames('focus:ring-0', error ? '!border-red-500' : '', className ? className : '')}
          type={type || 'text'}
          spellCheck="false"
          {...props}
          placeholder={props.placeholder}
        />
        {error && <span className="text-red-500 text-sm ">{error}</span>}
      </>
    );
  },
);

Input.displayName = 'Input';
