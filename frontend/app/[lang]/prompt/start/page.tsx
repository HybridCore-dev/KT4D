"use client";

import QuizActions from "@/actions/quiz";
import { SessionStats } from "@/actions/quiz/typing";
import UserActions from "@/actions/user";
import { UserStatus } from "@/actions/user/typing";
import Button from "@/components/platform/button";
import { alert, confirm } from "@/components/platform/confirm";
import Container from "@/components/platform/container";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import VideoBG from "@/components/platform/video-bg";
import useDictionary from "@/hooks/useDictionary";
import Store from "@/store";
import { ArrowPathIcon, PlayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { dictionary, locale } = useDictionary();
  const [stats, setStats] = useState<SessionStats>();
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const waitingFor = useMemo(
    () =>
      stats
        ? stats.sessionUserCount - stats.sessionFinishedTestCount
        : undefined,
    [stats]
  );

  useEffect(() => {
    const timer = setTimeout(fetchData, 50);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const session = Store.session.get();
    if (session) {
      const response = await QuizActions.getStats(session);
      if (response.success) {
        setStats(response.data);
        if (
          response.data.sessionFinishedTestCount !==
          response.data.sessionUserCount
        ) {
          setTimeout(fetchData, 5000);
        }
      } else if (
        response.error ===
        "Test phase has already finished. You cannot end test again!!!"
      ) {
        router.push(`/${locale}/platform-structure`);
      } else setTimeout(fetchData, 5000);
    } else console.log("Session could not be found!");

    setLoading(false);
  };

  const onStart = async () => {
    if (stats && waitingFor !== undefined) {
      if (waitingFor > 0) {
        if (
          !(await confirm(
            "Warning!",
            ` \nWaiting for ${waitingFor} user${
              waitingFor > 1 ? "s" : ""
            } to complete the quiz. Do you still want to continue?`,
            {
              confirmButtonText: "Continue Anyway",
            }
          ))
        ) {
          return;
        }
      }
      const session = Store.session.get();
      if (session) {
        setStartLoading(true);
        const response = await QuizActions.finish(session);
        if (response.success) {
          const currentStatus = Store.session.getUserStatus();
          const newStatus: UserStatus = {
            current: "PLATFORM_STRUCTURE_INFO",
            next: "DOCUMENT_TYPE_SELECTION",
            history: currentStatus ? currentStatus.history : [],
          };
          await UserActions.saveStatus(
            session.userId,
            session.sessionId,
            newStatus
          );
          router.push(`/${locale}/platform-structure`);
        } else alert("Error!", "Prompt could not be started!");
        setStartLoading(false);
      } else console.log("Session could not be found!");
    }
  };

  return (
    <>
      <Container className="text-center">
        <h3 className="mb-8">{dictionary.prompt.start.title}</h3>
        {waitingFor !== undefined && (
          <p className="mb-8">
            {waitingFor > 0
              ? dictionary.prompt.start.text.waiting
              : dictionary.prompt.start.text.ready}
          </p>
        )}
        <div className="my-12">
          {stats !== undefined && waitingFor !== undefined && (
            <>
              {waitingFor > 0 ? (
                <>
                  <h5>{dictionary.prompt.start.stats.title.waiting}</h5>
                  <div className="text-5xl my-8">
                    {stats.sessionFinishedTestCount}/{stats.sessionUserCount}
                  </div>
                </>
              ) : (
                <h4 className="text-7xl text-primary-light my-6">
                  {dictionary.prompt.start.stats.title.ready}
                </h4>
              )}
              <div className="flex mx-auto justify-center">
                {waitingFor > 0 && (
                  <Button
                    className="mx-2"
                    disabled={loading}
                    onClick={fetchData}
                  >
                    <ArrowPathIcon
                      className={clsx("h-5 w-5", {
                        "animate-spin": loading,
                      })}
                    />
                  </Button>
                )}
                <Button
                  className="mx-2"
                  icon={<PlayIcon className="w-5 h-5" />}
                  disabled={startLoading}
                  onClick={onStart}
                >
                  {dictionary.shared.finish}
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
      {stats === undefined && <FullscreenLoading />}
      <VideoBG />
    </>
  );
}
