import { Fragment, forwardRef, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretUp, CaretDown, Check } from 'phosphor-react';

export type SelectProps = {
  dataSource: Record<'name', string>[];
  onChange: any;
  cachedValue?: string;
};

const Select = forwardRef<HTMLDivElement, SelectProps>(({ dataSource, onChange, cachedValue }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ name: cachedValue || '' });

  const handleOpen = () => setIsOpen((prev) => !prev);

  console.log('selected.name este', selected.name);

  return (
    <div className="relative h-full" onClick={handleOpen}>
      <Listbox
        ref={ref}
        value={selected || cachedValue}
        onChange={(e) => {
          console.log('e', e);
          setSelected(e);
          onChange(e);
        }}
      >
        <div className="relative w-full">
          <Listbox.Button className="relative mb-2 text-black w-full cursor-default rounded-lg bg-transparent py-2 pl-1 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name || cachedValue}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isOpen ? (
                <CaretDown className="h-5 w-5 text-black" aria-hidden="true" />
              ) : (
                <CaretUp className="h-5 w-5 text-black" aria-hidden="true" />
              )}
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
    </div>
  );
});

export default Select;
