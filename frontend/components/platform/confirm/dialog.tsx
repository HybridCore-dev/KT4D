import * as React from "react";
import { confirmable } from "react-confirm";
import Button from "../button";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

export interface OptionsType {
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableCancelButton?: boolean;
}

interface Props {
  show: boolean;
  proceed(value: boolean): void;
  title: string;
  description?: string;
  options: OptionsType;
}

const defaultOptions = {
  confirmButtonText: "OK",
  cancelButtonText: "Cancel",
  disableCancelButton: false,
};

const Dialog = ({ show, proceed, title, description, options }: Props) => {
  options = { ...defaultOptions, ...options };

  const handleClose = () => {
    proceed(false);
  };

  const handleCancel = () => {
    proceed(false);
  };

  const handleConfirm = () => {
    proceed(true);
  };

  return (
    <Transition appear show={show} as={React.Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900 mb-6"
                >
                  {title}
                </HeadlessDialog.Title>

                <p className="text-base text-gray-500 whitespace-pre-wrap">
                  {description}
                </p>

                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    autoFocus
                  >
                    {options.confirmButtonText}
                  </Button>
                  {!options.disableCancelButton && (
                    <Button color="inherit" onClick={handleCancel}>
                      {options.cancelButtonText}
                    </Button>
                  )}
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default confirmable(Dialog);
