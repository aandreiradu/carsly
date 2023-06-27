import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

type LabelProps = Omit<ComponentPropsWithoutRef<'label'>, 'children'> & {
  children: ReactNode;
  disabled?: boolean;
};

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ disabled, htmlFor, className, children, ...props }, ref) => {
  return (
    <label className={`block ${className} ${disabled && 'opacity-50 hidden'}`} ref={ref} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
});

export default Label;
