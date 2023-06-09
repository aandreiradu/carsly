import { useEffect, useRef, useState, KeyboardEvent, ComponentPropsWithoutRef, ChangeEvent } from 'react';

export type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  maxLen: number;
  minLen: number;
  label: string;
  rows?: number;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ maxLen, minLen, label, rows, className, onChange, name }: TextareaProps) => {
  // forwardRef<HTMLTextAreaElement, TextareaProps>(
  //   ({ label, maxLen, minLen, rows, className, name, onChange }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionCount, setDescriptionCount] = useState<number>(0);
  const [descriptionCountExceeded, setDescriptionCountExceeded] = useState<boolean>(false);

  const updateDescriptionCount = () => {
    setDescriptionCount(descriptionRef?.current?.textLength ?? 0);
    if (descriptionCount > maxLen) {
      setDescriptionCountExceeded(true);
    }
  };

  useEffect(() => {
    if (descriptionCount > maxLen) {
      setDescriptionCountExceeded(true);
    } else {
      setDescriptionCountExceeded(false);
    }
  }, [descriptionCount]);

  const handleBackspace = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' || e.key === 'backspace') {
      setDescriptionCount(+String(descriptionRef?.current?.textLength).slice(0, maxLen - 1));
    }
  };

  return (
    <>
      <label htmlFor={label} className={`${descriptionCountExceeded && 'text-red-500'}`}>
        {label}
      </label>
      <textarea
        ref={descriptionRef}
        className={`focus:ring-transparent mt-2 h-36 resize-none py-2 pr-6 pl-4 lg:h-60 lg:py-4 lg:pr-10 ${
          descriptionCountExceeded && 'border border-red-500 '
        } ${className}`}
        id="description"
        autoComplete="off"
        rows={rows}
        maxLength={maxLen}
        minLength={minLen}
        name={name}
        onChange={(e) => {
          updateDescriptionCount();
          if (typeof onChange === 'function') {
            onChange(e);
          }
        }}
        onKeyDown={handleBackspace}
      ></textarea>
      <div className="flex">
        {descriptionCountExceeded && (
          <span className="text-sm lg:text-base flex text-red-500 items-center basis-3/5 ">
            Loooks like you exceeded the limit of {maxLen} characters.
          </span>
        )}
        <span
          className={`text-sm lg:text-base flex items-center justify-end  basis-2/5 ${
            descriptionCountExceeded ? 'text-red-500' : 'flex-1'
          }`}
        >
          {descriptionCount} / {maxLen}
        </span>
      </div>
    </>
  );
};

export default TextArea;
