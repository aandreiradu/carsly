import { Fragment, forwardRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretUp, CaretDown, Check } from 'phosphor-react';
import { cn } from '../Checkbox/checkbox.component';

export type SelectProps = {
  dataSource: Record<'name', string>[];
  onChange?: any;
  cachedValue?: string | number;
  classNameWrapper?: string;
  classNameListbox?: string;
  disabled?: boolean;
  error?: string;
};

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ disabled = false, classNameListbox, classNameWrapper, dataSource, onChange, cachedValue, error }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState({ name: cachedValue || '' });

    const handleOpen = () => setIsOpen((prev) => !prev);

    return (
      <div className={`relative h-full visible ${disabled && 'invisible'}`} onClick={handleOpen}>
        <Listbox
          ref={ref}
          value={selected || cachedValue}
          onChange={(e) => {
            setSelected(e);
            onChange(e);
          }}
        >
          <div className={`${cn('relative w-full', classNameWrapper)}`}>
            <Listbox.Button
              aria-disabled={disabled}
              className={`relative visible  text-black w-full cursor-default h-full rounded-lg bg-transparent 
                      pl-1 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
                      focus-visible:ring-white focus-visible:ring-opacity-75 
                      focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm
                      ${disabled && 'invisible opacity-50 cursor-not-allowed'}        
              `}
            >
              <span className="block truncate px-2 ">{cachedValue}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {isOpen && !disabled ? (
                  <CaretDown className="h-5 w-5 text-black" aria-hidden="true" />
                ) : (
                  <CaretUp className="h-5 w-5 text-black" aria-hidden="true" />
                )}
              </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options
                aria-disabled={disabled}
                className={`${cn(
                  'z-40 absolute top-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
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
                    value={{ name: data.name }}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{data.name}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
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
