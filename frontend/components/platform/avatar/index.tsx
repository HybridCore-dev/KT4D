import clsx from "clsx";
import { defaultFont } from "@/app/fonts";
import { Props } from "./typing";

export default function Avatar({
  avatar,
  type,
  title,
  subTitle,
  fullTitle = false,
}: Props) {
  const getAvatar = () => {
    if (avatar) return avatar;
    if (type === "letter" && title) {
      const nameArr = title.trim().split(" ");
      let firstLetters = nameArr[0][0];
      if (nameArr.length > 1) firstLetters += nameArr[nameArr.length - 1][0];
      return firstLetters;
    }
    return "";
  };

  return (
    <div className="flex items-center">
      <span
        className={clsx(
          "flex justify-center items-center rounded-full w-10 h-10",
          { "bg-yellow text-white": type === "letter" || type === "icon" }
        )}
      >
        {getAvatar()}
      </span>
      <div className="flex flex-col">
        {title !== undefined && (
          <span
            className={clsx(defaultFont.className, "text-text-secondary ms-2", {
              "max-w-40 truncate": !fullTitle,
            })}
            title={title}
          >
            {title}
          </span>
        )}
        {subTitle !== undefined && (
          <span
            className={clsx(
              defaultFont.className,
              "text-text-light text-sm ms-2"
            )}
          >
            {subTitle}
          </span>
        )}
      </div>
    </div>
  );
}
