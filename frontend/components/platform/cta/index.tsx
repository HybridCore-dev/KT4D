import clsx from "clsx";
import { Props } from "./typing";
import Image from "next/image";
import { defaultFont } from "@/app/fonts";
import Button from "../button";

import "./custom.css";

export default function CTA({
  title,
  text,
  button,
  image,
  className,
  subTitle,
  direction = "row",
  imageAttributes,
  textSectionClassName,
  imageSectionClassName,
}: Props) {
  return (
    <section className={clsx(className, "py-12 md:py-24")}>
      <div className="container mx-auto">
        <div
          className={clsx("flex items-center justify-between px-4 md:px-0", {
            "flex-col md:flex-row": direction === "row",
            "flex-col-reverse md:flex-row-reverse": direction === "row-reverse",
          })}
        >
          <div
            className={clsx(
              "relative w-full md:w-1/2 h-96 md:h-[650px]",
              imageSectionClassName
            )}
          >
            <Image
              src={image}
              fill
              alt={title}
              style={{ objectFit: "contain" }}
              {...imageAttributes}
            />
          </div>
          <div
            className={clsx(
              "md:w-2/5 py-12 text-center md:text-justify",
              textSectionClassName
            )}
          >
            {subTitle !== undefined && (
              <span className={clsx(defaultFont.className, "text-yellow my-8")}>
                {subTitle}
              </span>
            )}
            {title !== undefined && (
              <h1 className="text-5xl leading-tight font-medium my-7">
                {title}
              </h1>
            )}
            <div
              className={clsx(
                defaultFont.className,
                "custom-styles",
                "text-xl text-text-secondary *:mb-4 *:list-disc *:list-inside *:list-image-[url(check.svg)]"
              )}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
            {button !== undefined && (
              <Button href={button.url} className="mt-12">
                {button.visibleText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
