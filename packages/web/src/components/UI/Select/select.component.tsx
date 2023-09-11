import { Fragment, forwardRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretUp, CaretDown, X } from 'phosphor-react';
import { cn } from '../../../utils/styling.utils';

export type SelectProps = {
  dataSource: {
    value: string | number;
    label?: string;
  }[];
  onChange?: any;
  classNameWrapper?: string;
  classNameListbox?: string;
  disabled?: boolean;
  error?: string;
  value: {
    label: string | number;
    value: string | number;
  };
  clearValue: () => void;
};

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      clearValue,
      disabled = false,
      classNameListbox,
      classNameWrapper,
      dataSource,
      onChange,
      error,
      value = { label: '', value: '' },
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value);

    const handleOpen = () => {
      setIsOpen((prev) => !prev);
    };

    return (
      <div className={`relative h-full visible ${disabled && 'hidden'}`}>
        <Listbox
          ref={ref}
          value={value}
          onChange={(e: { value: string | number; label: string | number }) => {
            setSelected({ ...e });
            onChange(e);
          }}
        >
          <div className={`${cn('relative w-full', classNameWrapper)}`} onClick={handleOpen}>
            <Listbox.Button
              aria-disabled={disabled}
              className={`relative visible  text-black w-full cursor-default h-full rounded-lg bg-transparent 
                        pl-1 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
                        focus-visible:ring-white focus-visible:ring-opacity-75 
                        focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm
                        ${disabled && 'hidden opacity-50 cursor-not-allowed'}        
                `}
            >
              <span className="block truncate px-2">{value?.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 z-50">
                {!selected?.value && !isOpen && !disabled ? (
                  <CaretDown className="h-5 w-5 text-black" aria-hidden="true" />
                ) : !selected?.value ? (
                  <CaretUp className="h-5 w-5 text-black" aria-hidden="true" />
                ) : (
                  <X
                    className="h-5 w-5 text-black z-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected((prev) => ({
                        ...prev,
                        label: '',
                        value: '',
                      }));
                      clearValue();
                    }}
                  />
                )}
              </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options
                aria-disabled={disabled}
                className={`${cn(
                  'z-[99] absolute top-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                  classNameListbox,
                )}`}
              >
                {dataSource.map((data, dataIdx) => (
                  <Listbox.Option
                    key={dataIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 lg:pl-10 pl-2 lg:pr-4 pr-1 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={{ value: data.value, label: data.label }}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{data.label}</span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {error && <span className="text-red-500 text-sm ">{error}</span>}
      </div>
    );
  },
);

export default Select;
