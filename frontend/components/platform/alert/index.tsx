import { defaultFont } from "@/app/fonts";
import clsx from "clsx";
import { Props } from "./typing";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function Alert({ type, message }: Props) {
  return (
    <div
      className={clsx(
        defaultFont.className,
        "flex items-center p-4 text-white rounded-md",
        {
          "bg-[#2f7d32]": type === "success",
          "bg-[#d32f2e]": type === "error",
        }
      )}
    >
      {type === "success" && <CheckCircleIcon className="w-6 h-6 me-1" />}
      {type === "error" && <ExclamationCircleIcon className="w-6 h-6 me-1" />}
      <span>{message}</span>
    </div>
  );
}
