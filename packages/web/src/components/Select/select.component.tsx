import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretUp, CaretDown, Check } from 'phosphor-react';

export type SelectProps = {
  dataSource: Record<string, any>[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Select = ({ dataSource }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(dataSource[0]);

  useEffect(() => {
    console.log('selectedselected', selected);
  }, [selected]);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative h-full" onClick={handleOpen}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Listbox.Button className="relative text-black w-full cursor-default rounded-lg bg-transparent py-2 pl-1 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
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
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={data}
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
};

export default Select;
