import clsx from "clsx";
import { Props } from "./typing";
import { defaultFont } from "@/app/fonts";

export default function Button({ children, active, disabled, onClick }: Props) {
  const handleClick = () => {
    if (!active && onClick) onClick();
  };
  return (
    <button
      className={clsx(
        defaultFont.className,
        "flex justify-center items-center w-12 h-12 rounded-full mx-1 cursor-default transition-all duration-300",
        {
          "opacity-25": disabled,
          "bg-gray-600": active,
          "enabled:hover:bg-gray-700 !cursor-pointer": !active,
        }
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
