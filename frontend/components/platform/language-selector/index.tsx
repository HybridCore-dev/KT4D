"use client";

import { i18n, Locale } from "@/i18n-config";
import { usePathname } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

export default function LanguageSelector() {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
          <Menu.Button className="inline-flex justify-center items-center rounded-full box-border transition-all px-4 py-2 text-sm border font-thin bg-secondary-dark border-secondary-dark text-white enabled:hover:bg-secondary enabled:hover:border-secondary hover:bg-secondary hover:border-secondary">
            <GlobeAltIcon className="h-5 w-5 mr-1" />
            language
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-1 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {i18n.locales.map((locale) => {
                return (
                  <Menu.Item key={locale}>
                    {({ active }) => (
                      <Link
                        href={redirectedPathName(locale)}
                        className={`${
                          active ? "bg-gray-200" : ""
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-text-primary transition-all duration-300`}
                      >
                        {i18n.localeNames[locale]}
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
