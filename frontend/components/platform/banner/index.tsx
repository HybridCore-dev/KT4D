import clsx from "clsx";
import { Props } from "./typing";
import { defaultFont } from "@/app/fonts";
import Image from "next/image";

export default function Banner({ title, subTitle, image, className }: Props) {
  return (
    <section className={clsx(className, "relative")}>
      <div className="container mx-auto text-center relative z-10">
        <div className="flex flex-col h-80 items-center justify-center">
          <h1 className="font-medium text-4xl text-white">{title}</h1>
          {subTitle !== undefined && (
            <span className={clsx(defaultFont.className, "text-white mt-6")}>
              {subTitle}
            </span>
          )}
        </div>
      </div>

      <div className="absolute h-full w-full top-0 left-0">
        <Image src={image} fill alt={title} style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-r from-[#001422] to-[#33658A]/40 opacity-75"></div>
    </section>
  );
}
