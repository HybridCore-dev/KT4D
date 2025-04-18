"use client";

import { defaultFont } from "@/app/fonts";
import clsx from "clsx";
import { Props } from "./type";

export default function FullscreenLoading({
  show = true,
  loadingText = "Loading...",
}: Props) {
  if (!show) return <></>;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className={clsx(defaultFont.className, "ms-2 text-white")}>
          {loadingText}
        </span>
      </div>
    </div>
  );
}
