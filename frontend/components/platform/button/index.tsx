import Link from "next/link";
import { Props } from "./typing";
import clsx from "clsx";
import { defaultFont } from "@/app/fonts";

export default function Button({
  variant = "contained",
  color = "primary",
  size = "large",
  type = "button",
  href,
  icon,
  className: defaultClassName,
  disabled,
  scroll,
  title,
  onClick,
  children,
  ...rest
}: Props) {
  const className = clsx(
    defaultClassName,
    defaultFont.className,
    "inline-flex justify-center items-center rounded-full box-border transition-all",
    {
      "px-7 py-4 text-[13px] border-2 ": size === "large",
      "px-5 py-3 border-2": size === "medium",
      "px-4 py-2 text-sm border font-thin": size === "small",
      "px-3.5 py-1.5 text-sm border font-thin": size === "tiny",

      "bg-primary border-primary text-white enabled:hover:bg-secondary enabled:hover:border-secondary hover:bg-secondary hover:border-secondary mt-4 mb-0 hover:mt-0 hover:mb-4":
        variant === "contained" && color === "primary",

      "bg-secondary-dark border-secondary-dark text-white enabled:hover:bg-secondary enabled:hover:border-secondary hover:bg-secondary hover:border-secondary":
        variant === "contained" && color === "secondary",

      "bg-silver-chalice-400 border-silver-chalice-400 text-black enabled:hover:bg-white enabled:hover:border-white enabled:hover:shadow hover:bg-white hover:border-white hover:shadow":
        variant === "contained" && color === "inherit",

      "bg-white border-white text-black enabled:hover:bg-silver-chalice-200 enabled:hover:border-silver-chalice-200 hover:bg-silver-chalice-200 hover:border-silver-chalice-200":
        variant === "contained" && color === "white",

      "bg-yellow border-yellow text-white enabled:hover:bg-yellow/90 enabled:hover:border-yellow/90 hover:bg-yellow/90 hover:border-yellow/90":
        variant === "contained" && color === "yellow",

      "border-primary text-primary enabled:hover:bg-primary enabled:hover:text-white hover:bg-primary hover:text-white ":
        variant === "outlined" && color === "primary",

      "border-secondary text-secondary enabled:hover:bg-secondary enabled:hover:text-white hover:bg-secondary hover:text-white":
        variant === "outlined" && color === "secondary",

      "border-black text-black enabled:hover:bg-black enabled:hover:text-white hover:bg-black hover:text-white":
        variant === "outlined" && color === "inherit",

      "border-white text-white enabled:hover:bg-white enabled:hover:text-black hover:bg-white hover:text-black":
        variant === "outlined" && color === "white",

      "text-primary !border-0 !px-0 !py-0 enabled:hover:text-secondary hover:text-secondary":
        variant === "text" && color === "primary",

      "text-secondary !border-0 !px-0 !py-0 enabled:hover:text-primary hover:text-primary":
        variant === "text" && color === "secondary",

      "text-white !border-0 !px-0 !py-0 enabled:hover:opacity-85 hover:opacity-85":
        variant === "text" && color === "white",

      "text-yellow !border-0 !px-0 !py-0 enabled:hover:text-yellow/90 hover:text-yellow/90":
        variant === "text" && color === "yellow",

      "disabled:opacity-25": disabled,
    }
  );
  const iconChild = icon !== undefined && <span className="ms-2">{icon}</span>;

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={className}
        onClick={onClick}
        role="button"
        scroll={scroll}
        title={title}
        {...rest}
      >
        {children}
        {iconChild}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...rest}
    >
      {children}
      {iconChild}
    </button>
  );
}
