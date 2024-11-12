import Image from "next/image";
import clsx from "clsx";

import { Props } from "./typing";
import { defaultFont } from "@/app/fonts";

import UnderConsImage from "./assets/under-construction.svg";

export default async function UnderConstruction({ title, subTitle }: Props) {
  return (
    <div className="container mx-auto py-32 px-4 md:px-0">
      <div className="flex flex-col-reverse md:flex-row items-center">
        <div className="flex-1 min-h-32 text-center md:text-left py-8">
          <h1
            className={clsx(
              defaultFont.className,
              "font-bold text-4xl md:text-7xl !leading-tight text-[#001E5E]"
            )}
          >
            {title}
          </h1>
          <h1
            className={clsx(
              defaultFont.className,
              "font-medium text-3xl md:text-6xl !leading-tight text-[#001E5E]"
            )}
          >
            {subTitle}
          </h1>
        </div>
        <div className="flex-1 min-h-32">
          <Image src={UnderConsImage} alt={`${title} - Under Construction`} />
        </div>
      </div>
    </div>
  );
}
