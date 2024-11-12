"use client";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Props } from "./typing";

export default function SelectBox({
  value: defaultValue,
  options,
  placeholder,
  label,
  onChange,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleOnChange = (newValue: string | number) => {
    if (newValue === value) newValue = "";
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="relative w-full">
      <Combobox value={value} onChange={handleOnChange}>
        <div className="relative">
          {label !== undefined && (
            <span className="absolute bg-white -top-2 left-2 text-xs px-1 text-text-secondary">
              Order By
            </span>
          )}
          <Combobox.Button className="w-full flex justify-between items-center text-white border border-secondary-light/20 rounded-md px-4 py-2 h-[42px]">
            {value ? (
              <span>{options.find((item) => item.value === value)?.text}</span>
            ) : (
              <span className="opacity-50">{placeholder}</span>
            )}
            <ChevronDownIcon
              className="h-3 w-3 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-text-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {options.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ selected }) =>
                    `relative cursor-pointer select-none py-2 pl-9 pr-4 hover:bg-gray-700 ${
                      selected ? "text-white bg-gray-700" : ""
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-left ${
                          selected ? "font-medium bg-gray-700" : "font-normal"
                        }`}
                      >
                        {option.text}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 text-black`}
                        >
                          <CheckIcon
                            className="h-4 w-4 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
