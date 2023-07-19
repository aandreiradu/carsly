import { forwardRef, useId } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import Label from '../Label/label.component';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  labelClasses?: string;
  error?: string;
  disabled?: boolean;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, labelClasses, label, type, error, className, value, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && (
          <Label
            htmlFor={id}
            className={`
            text-sm visible ${labelClasses}
            ${disabled && 'hidden opacity-20 cursor-not-allowed transition-opacity'} 
            ${classNames(error ? '!text-red-500' : '')}`}
          >
            {label}
          </Label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
              visible
              ${classNames('focus:ring-0', error ? '!border-red-500' : '', className ? className : '')}
              ${disabled && 'hidden opacity-50 cursor-not-allowed'}
          `}
          type={type || 'text'}
          spellCheck="false"
          {...props}
          placeholder={props.placeholder}
          disabled={disabled}
        />
        {error && <span className="text-red-500 text-xs md:text-sm ">{error}</span>}
      </>
    );
  },
);

Input.displayName = 'Input';
