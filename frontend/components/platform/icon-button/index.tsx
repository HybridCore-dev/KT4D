import Link from "next/link";
import { Props } from "./typing";
import clsx from "clsx";
import { defaultFont } from "@/app/fonts";

export default function IconButton({
  variant = "primary",
  size = "medium",
  type = "button",
  href,
  className: defaultClassName,
  disabled = false,
  onClick,
  children,
}: Props) {
  const className = clsx(
    defaultClassName,
    defaultFont.className,
    "inline-flex justify-center items-center rounded-full box-border border-2 transition-colors",
    {
      "bg-primary border-primary text-white hover:bg-secondary hover:border-secondary":
        variant === "primary",
      "bg-white border-white text-primary hover:bg-primary hover:text-white":
        variant === "white",
      "bg-yellow border-yellow text-white border hover:bg-white hover:text-gray-400 hover:border-gray-300":
        variant === "yellow",

      "w-12 h-12": size === "medium",
      "w-8 h-8": size === "small",

      "disabled:opacity-25": disabled,
    }
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={className} onClick={onClick} role="button">
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
