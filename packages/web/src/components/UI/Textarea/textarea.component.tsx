import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  forwardRef,
  TextareaHTMLAttributes,
  Ref,
  ForwardRefRenderFunction,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxLen: number;
  minLen: number;
  label: string;
  rows?: number;
  className?: string;
  onChange?: any;
  name: string;
};

// const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
//   // ({ label, maxLen, minLen, rows, className,name,...rest }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
//   ({ label, maxLen, minLen, rows, className, name }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  { name, ...rest },
  ref: Ref<HTMLTextAreaElement>,
) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionCount, setDescriptionCount] = useState<number>(0);
  const [descriptionCountExceeded, setDescriptionCountExceeded] = useState<boolean>(false);
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const updateDescriptionCount = () => {
    setDescriptionCount(descriptionRef?.current?.textLength ?? 0);
    if (descriptionCount > rest.maxLen) {
      setDescriptionCountExceeded(true);
    }
    console.log('descriptionRef.current?.value este', descriptionRef.current?.value);
    onChange(descriptionRef.current?.value);
  };

  useEffect(() => {
    if (descriptionCount > rest.maxLen) {
      setDescriptionCountExceeded(true);
    } else {
      setDescriptionCountExceeded(false);
    }
  }, [descriptionCount]);

  const handleBackspace = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' || e.key === 'backspace') {
      setDescriptionCount(+String(descriptionRef?.current?.textLength).slice(0, rest.maxLen - 1));
    }
    console.log('target este', e.currentTarget.value);
    onChange(e.currentTarget.value);
  };

  return (
    <>
      <label htmlFor={rest.label} className={`${descriptionCountExceeded && 'text-red-500'}`}>
        {rest.label}
      </label>
      <textarea
        className={`focus:ring-transparent mt-2 h-36 resize-none py-2 pr-6 pl-4 lg:h-60 lg:py-4 lg:pr-10 ${
          descriptionCountExceeded && 'border border-red-500 '
        } ${rest.className}`}
        id="description"
        autoComplete="off"
        rows={rest.rows}
        maxLength={rest.maxLen}
        minLength={rest.minLen}
        name={name}
        ref={ref}
        onChange={updateDescriptionCount}
        onKeyDown={handleBackspace}
      ></textarea>
      <div className="flex">
        {descriptionCountExceeded && (
          <span className="text-sm lg:text-base flex text-red-500 items-center basis-3/5 ">
            Loooks like you exceeded the limit of {rest.maxLen} characters.
          </span>
        )}
        <span
          className={`text-sm lg:text-base flex items-center justify-end  basis-2/5 ${
            descriptionCountExceeded ? 'text-red-500' : 'flex-1'
          }`}
        >
          {descriptionCount} / {rest.maxLen}
        </span>
      </div>
    </>
  );
};

export default forwardRef(TextArea);
