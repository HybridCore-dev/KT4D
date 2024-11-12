"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "@/components/platform/button";
import VideoBG from "@/components/platform/video-bg";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import Store from "@/store";
import { ProfileGroup } from "@/actions/quiz/typing";
import QuizActions from "@/actions/quiz";
import useDictionary from "@/hooks/useDictionary";
import Video from "./components/video";
import { UserStatus } from "@/actions/user/typing";
import UserActions from "@/actions/user";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { locale, dictionary } = useDictionary();
  const [profileGroup, setProfileGroup] = useState<ProfileGroup | null>();

  useEffect(() => {
    fetch();
    return () => {};
  }, []);

  const fetch = async () => {
    const id = Store.session.getProfileId();
    if (id) {
      const response = await QuizActions.getProfileGroup(id);
      if (response.success) {
        setProfileGroup(response.data);
        return;
      }
    }
    setProfileGroup(null);
  };

  const handleUpdateUserStatus = async () => {
    const session = Store.session.get();
    if (session) {
      const currentStatus = Store.session.getUserStatus();
      const newStatus: UserStatus = {
        current:
          Store.session.getUserRole() === "MODERATOR"
            ? "WAITING_OTHER_USERS"
            : "PLATFORM_STRUCTURE_INFO",
        next:
          Store.session.getUserRole() === "MODERATOR"
            ? "DOCUMENT_TYPE_SELECTION"
            : "PLATFORM_STRUCTURE_INFO",
        history: currentStatus ? currentStatus.history : [],
      };
      await UserActions.saveStatus(
        session.userId,
        session.sessionId,
        newStatus
      );
      router.push(
        Store.session.getUserRole() === "MODERATOR"
          ? `/${locale}/prompt/start`
          : `/${locale}/platform-structure`
      );
    }
  };

  if (profileGroup === null)
    return (
      <div className="text-center py-10">Profile type could not created!</div>
    );

  if (profileGroup === undefined) return <FullscreenLoading />;

  return (
    <>
      <div className="max-w-3xl px-6 mx-auto my-8 text-center">
        <h4 className="font-bold">{dictionary.quiz.results.title}</h4>
        <h2 className="text-secondary font-bold mt-2 mb-10">
          {profileGroup[`title_${locale}`]}
        </h2>
        <p className="text-xl mb-10">{profileGroup[`details_${locale}`]}</p>

        <div className="mb-32">
          {Store.session.getUserRole() === "MEMBER" && (
            <Button
              icon={<ArrowRightIcon className="w-5 h-5" />}
              onClick={handleUpdateUserStatus}
            >
              {dictionary.shared.next}
            </Button>
          )}
          {Store.session.getUserRole() === "MODERATOR" && (
            <Button
              icon={<ArrowRightIcon className="w-5 h-5" />}
              onClick={handleUpdateUserStatus}
            >
              {dictionary.shared.next}
            </Button>
          )}
        </div>

        <Video />
      </div>

      <VideoBG />
    </>
  );
}
