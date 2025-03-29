"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/platform/button";
import IconMedia from "@/assets/icon-media.svg";
import IconButton from "@/components/platform/icon-button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useDictionary from "@/hooks/useDictionary";

export default function WhatIsRAG() {
  const { dictionary } = useDictionary();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Button
        variant="text"
        color="white"
        className="flex-col"
        onClick={openModal}
      >
        <Image src={IconMedia} width={36} height={36} alt="" className="mb-2" />
        {dictionary.ragDetails.title}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="container transform overflow-hidden rounded-2xl bg-[#1B2B42] pt-16 pb-4 md:pb-6 px-4 md:px-24 text-center shadow-xl transition-all">
                  <IconButton
                    className="absolute top-6 right-6"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                  <Dialog.Title
                    as="h4"
                    className="font-semibold max-w-2xl mx-auto mb-8"
                  >
                    {dictionary.ragDetails.title}
                  </Dialog.Title>

                  <iframe
                    src="https://www.youtube-nocookie.com/embed/cV11vX3V30E?si=kBspPKAQTxJMV60S"
                    className="w-full aspect-video rounded-2xl"
                    title="Profiles used in DDL"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
