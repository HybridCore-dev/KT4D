"use client";

import { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";

import IconButton from "@/components/platform/icon-button";
import useDictionary from "@/hooks/useDictionary";
import {
  ArrowLeftEndOnRectangleIcon,
  LockClosedIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Props } from "./typing";
import TextInput from "@/components/platform/text-input";
import Button from "@/components/platform/button";
import SubmitButton from "@/components/platform/submit-button";
import { alert } from "@/components/platform/confirm";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import clsx from "clsx";
import { SessionJoinUserType } from "@/actions/session/typing";

export default function JoinSession({
  open,
  loading,
  onSubmit,
  onCancel,
}: Props) {
  const { dictionary } = useDictionary();

  const handleSubmit = (formData: FormData) => {
    const userType = formData.get("userType") as SessionJoinUserType;
    const password = formData.get("password")?.toString();

    if (userType === "NEW_USER") {
      const sessionPassword = formData.get("sessionPassword")?.toString();

      if (!sessionPassword) {
        alert(dictionary.shared.error, dictionary.shared.emptyFieldError);
        return;
      }

      if (sessionPassword.length < 4) {
        alert(
          dictionary.shared.error,
          dictionary.shared.passwordLengthError.replace(
            "$1",
            "Session password"
          )
        );
        return;
      }

      if (!password) {
        alert(dictionary.shared.error, dictionary.shared.emptyFieldError);
        return;
      }

      if (password.length < 4) {
        alert(
          dictionary.shared.error,
          dictionary.shared.passwordLengthError.replace("$1", "User password")
        );
        return;
      }

      onSubmit({
        sessionId: 0,
        userType: "NEW_USER",
        sessionPassword,
        password,
      });
      return;
    }

    if (userType === "EXISTING_USER") {
      const username = formData.get("username")?.toString();

      if (!username || !password) {
        alert(dictionary.shared.error, dictionary.shared.emptyFieldError);
        return;
      }

      if (password.length < 4) {
        alert(
          dictionary.shared.error,
          dictionary.shared.passwordLengthError.replace("$1", "User password")
        );
        return;
      }

      onSubmit({
        sessionId: 0,
        userType: "EXISTING_USER",
        userName: username,
        password,
      });
      return;
    }

    if (userType === "MODERATOR") {
      const password = formData.get("password")?.toString();

      if (!password) {
        alert(dictionary.shared.error, dictionary.shared.emptyFieldError);
        return;
      }

      if (password.length < 4) {
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
        sessionId: 0,
        userType: "MODERATOR",
        password,
      });
      return;
    }
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
                  {dictionary.quiz.start.joinSession}
                </Dialog.Title>

                <div className="p-8 pb-4">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl border-border-primary border p-1">
                      <Tab
                        className={({ selected }) =>
                          clsx(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white flex items-center justify-center",
                            // "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected ? "bg-primary " : "hover:bg-white/[0.12] "
                          )
                        }
                      >
                        <UserPlusIcon className="w-4 h-4 mr-1" />
                        <span>New User</span>
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          clsx(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white flex items-center justify-center",
                            // "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected ? "bg-primary " : "hover:bg-white/[0.12] "
                          )
                        }
                      >
                        <ArrowLeftEndOnRectangleIcon className="w-4 h-4 mr-1" />
                        <span>Existing User</span>
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          clsx(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white flex items-center justify-center",
                            // "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected ? "bg-primary " : "hover:bg-white/[0.12] "
                          )
                        }
                      >
                        <LockClosedIcon className="w-4 h-4 mr-1" />
                        <span>Moderator</span>
                      </Tab>
                    </Tab.List>

                    <Tab.Panels className="mt-8">
                      <Tab.Panel>
                        <form action={handleSubmit}>
                          <input
                            type="hidden"
                            name="userType"
                            value="NEW_USER"
                          />
                          <div className="relative">
                            <TextInput
                              label="Session Password"
                              name="sessionPassword"
                              required
                              type="password"
                              className="mb-4"
                              disabled={loading}
                            />

                            <TextInput
                              label="User Password"
                              name="password"
                              type="password"
                              required
                              disabled={loading}
                            />
                            <span className="block text-text-light text-sm mt-1">
                              You will use this password to ...
                            </span>
                          </div>

                          <div className="flex justify-between mt-6">
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
                        </form>
                      </Tab.Panel>

                      <Tab.Panel>
                        <form action={handleSubmit}>
                          <input
                            type="hidden"
                            name="userType"
                            value="EXISTING_USER"
                          />
                          <div className="relative">
                            <TextInput
                              label="Username"
                              name="username"
                              required
                              className="mb-4"
                              disabled={loading}
                            />

                            <TextInput
                              label="Password"
                              name="password"
                              type="password"
                              required
                              disabled={loading}
                            />
                          </div>

                          <div className="flex justify-between mt-6">
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
                        </form>
                      </Tab.Panel>

                      <Tab.Panel>
                        <form action={handleSubmit}>
                          <input
                            type="hidden"
                            name="userType"
                            value="MODERATOR"
                          />
                          <div className="relative">
                            <TextInput
                              label="Moderator Password"
                              name="password"
                              type="password"
                              required
                              disabled={loading}
                            />
                          </div>

                          <div className="flex justify-between mt-6">
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
                        </form>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
