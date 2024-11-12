import Link from "next/link";
import { Props } from "./typing";

import { defaultFont } from "@/app/fonts";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function InteractiveBanner({
  title,
  topText,
  bottomText,
  image,
  url,
}: Props) {
  return (
    <Link href={url}>
      <div className="group inline-flex flex-col border border-border-light px-12 py-12 relative">
        <span className="text-yellow group-hover:text-white">{topText}</span>
        <h1 className="font-medium text-3xl text-black mt-12 mb-9 h-28 overflow-hidden group-hover:text-white">
          {title}
        </h1>

        <div className="flex  items-center ">
          <span
            className={clsx(
              defaultFont.className,
              "text-text-light group-hover:text-white"
            )}
          >
            {bottomText}
          </span>

          <ArrowLongRightIcon className="h-8 w-12 text-border group-hover:text-white" />
        </div>

        <div className="absolute w-full h-full -z-10 top-0 left-0 overflow-hidden bg-cover opacity-0 group-hover:opacity-75 transition-all ease-out duration-300">
          <div
            className="absolute w-full h-full top-0 left-0 z-0 group-hover:scale-125 transition-all ease-out duration-300 bg-cover"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="absolute w-full h-full top-0 left-0 z-10 bg-gradient-to-r from-black to-yellow opacity-75"></div>
        </div>
      </div>
    </Link>
  );
}
