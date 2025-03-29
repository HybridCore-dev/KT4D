"use server";

import {
  ProfileGroup,
  Question,
  SaveTestResultsRequestDTO,
  SaveTestResultsResponseDTO,
  SessionStats,
  SessionStatsRequest,
} from "./typing";

import { ResponseJSON } from "../helpers";
import { Locale } from "@/i18n-config";

import QuestionsDataEn from "./mock-data/questions-en.json";
import QuestionsDataEs from "./mock-data/questions-es.json";
import QuestionsDataPl from "./mock-data/questions-pl.json";

import ProfileGroups from "./mock-data/profile-groups.json";
import { ResponseType } from "../typing";

const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

export async function getQuestions(locale: Locale): Promise<Array<Question>> {
  try {
    if (locale === "es") return QuestionsDataEs as Array<Question>;
    if (locale === "pl") return QuestionsDataPl as Array<Question>;

    return QuestionsDataEn as Array<Question>;

    // const response = await fetch(`${API_PATH}/questions`, {
    //   cache: "no-store",
    // });
    // console.log(response.headers);

    // return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveResults(
  locale: Locale,
  data: SaveTestResultsRequestDTO
) {
  const response = await fetch(`${API_PATH}/save-test-results`, {
    cache: "no-store",
    method: "POST",
    headers: {
      // language: locale,
    },
    body: JSON.stringify(data),
  });
  return ResponseJSON<SaveTestResultsResponseDTO>(response);
}

export async function getStats(data: SessionStatsRequest) {
  const response = await fetch(`${API_PATH}/finish-test-phase`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ ...data, forceFinish: false }),
  });
  return ResponseJSON<SessionStats>(response);
}

export async function finish(data: SessionStatsRequest) {
  const response = await fetch(`${API_PATH}/finish-test-phase`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ ...data, forceFinish: true }),
  });
  return ResponseJSON<boolean>(response);
}

export async function getProfileGroup(
  id: number
): Promise<ResponseType<ProfileGroup>> {
  const profileGroups: ProfileGroup[] = ProfileGroups;
  const profileGroup = profileGroups.find((item) => item.id === id);

  if (profileGroup)
    return {
      success: true,
      data: profileGroup,
    };

  return {
    success: false,
    error: "Profile group could not be found!",
  };
}
