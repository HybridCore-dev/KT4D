"use server";

import { Locale } from "@/i18n-config";
import { ResponseJSON } from "../helpers";
import { PromptRequestDTO, PromptResponseDTO } from "./typing";

const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

export async function ask(locale: Locale, data: PromptRequestDTO) {
  const response = await fetch(`${API_PATH}/ask-prompt`, {
    cache: "no-store",
    method: "POST",
    headers: {
      language: locale,
    },
    body: JSON.stringify(data),
  });

  return ResponseJSON<PromptResponseDTO>(response);
}
