import Image from "next/image";
import { Props } from "./typing";
import Link from "next/link";
import clsx from "clsx";
import { defaultFont } from "@/app/fonts";

export default function Card({
  title,
  subTitle,
  caption,
  image,
  url,
  footer,
  imageHeight,
  titleHeight,
}: Props) {
  return (
    <Link href={url}>
      <div className="group shadow-lg rounded-md overflow-hidden relative">
        <div
          className={`overflow-hidden relative ${
            imageHeight ? imageHeight : "h-64"
          } bg-yellow`}
        >
          <Image
            src={image}
            fill
            alt={title}
            style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-all ease-out duration-300"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10 transition-all ease-out duration-300 bg-black opacity-0 group-hover:opacity-25"></div>
        </div>

        {caption !== undefined && (
          <span
            className={clsx(
              defaultFont.className,
              "absolute top-4 right-4 rounded-full bg-primary text-white px-3 py-1 text-xs font-light z-20",
              "transition-all ease-out duration-300 group-hover:bg-white group-hover:text-primary"
            )}
          >
            {caption}
          </span>
        )}

        <div className="flex flex-col py-11 px-9">
          {subTitle !== undefined && (
            <span className="text-yellow truncate">{subTitle}</span>
          )}
          <h1
            className={`text-2xl my-9 ${
              titleHeight ? titleHeight : "h-32"
            } overflow-hidden`}
          >
            {title}
          </h1>
          {footer}
        </div>
      </div>
    </Link>
  );
}
