"use client";

import { UserRoleType } from "@/actions/quiz/typing";
import SessionActions from "@/actions/session";
import { alert, confirm } from "@/components/platform/confirm";
import Store from "@/store";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDictionary from "@/hooks/useDictionary";
import {
  Session,
  SessionCreateRequest,
  SessionJoinRequest,
  SessionJoinResponse,
  SessionJoinUserType,
} from "@/actions/session/typing";
import UserActions from "@/actions/user";
import useUserStatus from "@/hooks/useUserStatus";

export default function useLogic() {
  const router = useRouter();
  const { locale } = useDictionary();
  const userStatus = useUserStatus();
  const [sessions, setSessions] = useState<Array<Session>>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(fetchData, 50);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const fetchData = async () => {
    setFetchLoading(true);
    const response = await SessionActions.getAll();
    if (response.success) {
      setSessions(response.data);
      const currentSession = Store.session.get();
      if (
        currentSession &&
        response.data.find(
          (item) => item.active && item.id === currentSession.sessionId
        )
      ) {
        const response = await UserActions.getStatus(
          currentSession.userId,
          currentSession.sessionId
        );
        if (response.success) {
          setFetchLoading(false);
          Store.session.setUserStatus(response.data);
          console.log(response.data);

          if (
            await confirm(
              "Open Session!",
              "You've an open session. Would you like to continue where you left?"
            )
          ) {
            userStatus.navigateTo(response.data);
          }
        }
      }
    } else alert("Error!", response.error);
    setFetchLoading(false);
  };

  const createSession = async (data: SessionCreateRequest) => {
    setCreateLoading(true);
    const response = await SessionActions.create(data);
    if (response.success) startSession(response.data, "MODERATOR");
    else alert("Error!", response.error);
    setCreateLoading(false);
  };

  const joinSession = async (_data: SessionJoinRequest) => {
    if (selectedSessionId) {
      setJoinLoading(true);
      const data: SessionJoinRequest = {
        ..._data,
        sessionId: selectedSessionId,
      };
      console.log(data);

      const response = await SessionActions.join(data);
      if (response.success) startSession(response.data, data.userType);
      else alert("Error!", response.error);
      setJoinLoading(false);
    } else alert("Error!", "Session did not selected!");
  };

  const startSession = (
    session: SessionJoinResponse | false,
    userType: SessionJoinUserType
  ) => {
    if (session) {
      const userRole: UserRoleType =
        userType === "MODERATOR" ? "MODERATOR" : "MEMBER";
      const sessionStored = Store.session.set(session);
      const roleStored = Store.session.setUserRole(userRole);
      if (userType === "NEW_USER") {
        confirm(
          "User Created",
          `Your username is: ${session.userName}\nYou can use this username to login as an Existing User for the next time.`
        );
      }
      if (sessionStored && roleStored) {
        UserActions.saveStatus(session.userId, session.sessionId, {
          current: "QUIZ_INPROGRESS",
          next: "QUIZ_INPROGRESS",
          history: [],
        })
          .then((response) => {
            if (response.success) {
              Store.session.setUserStatus(response.data);
              router.push(`/${locale}/quiz/session`);
            } else alert("Error!", "User status could not be saved!");
          })
          .catch((error) => {
            alert(
              "Error!",
              "An error occurred while creating the user status.\n" +
                JSON.stringify(error)
            );
          });
      } else alert("Error!", "Session could not stored!");
    } else alert("Error!", "Session could not created!");
  };

  return {
    state: {
      fetchLoading,
      createLoading,
      joinLoading,
      sessions,
    },
    action: {
      createSession,
      joinSession,
      setSelectedSessionId,
    },
  };
}
