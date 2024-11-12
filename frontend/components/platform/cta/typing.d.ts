import { StaticImageData } from "next/image";

export interface Props {
  title?: string;
  text: string;
  button?: {
    visibleText: string;
    url: string;
  };
  image: string | StaticImageData;
  subTitle?: string;
  className?: string;
  direction?: "row" | "row-reverse";
  imageAttributes?: any;
  textSectionClassName?: string;
  imageSectionClassName?: string;
}
