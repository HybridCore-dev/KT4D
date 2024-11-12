"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import IconButton from "@/components/platform/icon-button";
import useDictionary from "@/hooks/useDictionary";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Props } from "./typing";
import TextInput from "@/components/platform/text-input";
import Button from "@/components/platform/button";
import SubmitButton from "@/components/platform/submit-button";
import { alert } from "@/components/platform/confirm";
import FullscreenLoading from "@/components/platform/fullscreen-loading";

export default function CreateSession({
  open,
  loading,
  onSubmit,
  onCancel,
}: Props) {
  const { dictionary } = useDictionary();

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const moderatorPassword = formData.get("moderatorPassword")?.toString();
    const sessionPassword = formData.get("sessionPassword")?.toString();

    if (!name || !moderatorPassword || !sessionPassword) {
      alert(dictionary.shared.error, dictionary.shared.emptyFieldError);
      return;
    }

    if (sessionPassword.length < 4) {
      alert(
        dictionary.shared.error,
        dictionary.shared.passwordLengthError.replace("$1", "Session password")
      );
      return;
    }

    if (moderatorPassword.length < 4) {
      alert(
        dictionary.shared.error,
        dictionary.shared.passwordLengthError.replace(
          "$1",
          "Moderator password"
        )
      );
      return;
    }

    onSubmit({
      name,
      sessionPassword,
      moderatorPassword,
    });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[500px] max-w-full transform overflow-hidden rounded-2xl bg-[#1B2B42] pt-8 pb-4 md:pb-6 px-0 shadow-xl transition-all">
                <IconButton
                  className="absolute top-6 right-6"
                  onClick={onCancel}
                >
                  <XMarkIcon className="w-5 h-5" />
                </IconButton>
                <Dialog.Title
                  as="h5"
                  className="font-semibold max-w-2xl text-left pl-8"
                >
                  {dictionary.quiz.start.createSession}
                </Dialog.Title>

                <form action={handleSubmit}>
                  <div className="relative">
                    <div className="px-8 py-8">
                      <TextInput
                        label="Name"
                        name="name"
                        required
                        placeholder="Enter a session name"
                        className="mb-4"
                        disabled={loading}
                      />

                      <TextInput
                        label="Session Password"
                        name="sessionPassword"
                        required
                        type="password"
                        className="mb-4"
                        disabled={loading}
                      />

                      <TextInput
                        label="Moderator Password"
                        name="moderatorPassword"
                        required
                        type="password"
                        disabled={loading}
                      />
                    </div>

                    <div className="flex justify-between px-8">
                      <Button
                        variant="text"
                        color="white"
                        onClick={onCancel}
                        disabled={loading}
                      >
                        {dictionary.shared.cancel}
                      </Button>
                      <SubmitButton disabled={loading} />
                    </div>

                    <FullscreenLoading
                      show={loading}
                      loadingText={dictionary.shared.loading}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
