"use server";

import { ResponseJSON } from "../helpers";
import { UserStatus } from "./typing";

const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

export async function getStatus(id: number, sessionId: number) {
  const response = await fetch(
    `${API_PATH}/user/${id}/session/${sessionId}/status`,
    {
      cache: "no-store",
    }
  );

  return ResponseJSON<UserStatus>(response);
}

export async function saveStatus(
  id: number,
  sessionId: number,
  data: UserStatus
) {
  const response = await fetch(
    `${API_PATH}/user/${id}/session/${sessionId}/status`,
    {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return ResponseJSON<UserStatus>(response);
}
