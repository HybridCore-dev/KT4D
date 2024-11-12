"use server";

import { ResponseJSON } from "../helpers";
import {
  Session,
  SessionCreateRequest,
  SessionCreateResponse,
  SessionEndRequest,
  SessionJoinRequest,
  SessionJoinResponse,
} from "./typing";

const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

export async function getAll(active: boolean = true) {
  const response = await fetch(`${API_PATH}/session/list?active=${active}`, {
    cache: "no-store",
  });
  return ResponseJSON<Array<Session>>(response);
}

export async function create(data: SessionCreateRequest) {
  const response = await fetch(`${API_PATH}/session/create`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
  });

  return ResponseJSON<SessionCreateResponse>(response);
}

export async function join(data: SessionJoinRequest) {
  const response = await fetch(`${API_PATH}/session/join`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
  });
  return ResponseJSON<SessionJoinResponse>(response);
}

export async function end(data: SessionEndRequest) {
  const response = await fetch(`${API_PATH}/session/end`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
  });
  return ResponseJSON<string>(response);
}
