import { defaultFont } from "@/app/fonts";
import clsx from "clsx";
import { Props } from "./typing";

export default function TextInput({
  label,
  required,
  multiline,
  className,
  ...rest
}: Props) {
  return (
    <div className={clsx(defaultFont.className, "flex flex-col w-full")}>
      {label !== undefined && (
        <label className="mb-2.5">
          {label} {required && <span className="text-[#900]">*</span>}
        </label>
      )}

      {multiline ? (
        <textarea
          className={clsx(
            "w-full px-4 py-2 border border-secondary-light/20 rounded-md bg-transparent",
            className
          )}
          required={required}
          {...rest}
        ></textarea>
      ) : (
        <input
          type="text"
          required={required}
          className={clsx(
            "w-full px-4 py-2 border border-secondary-light/20 rounded-md bg-transparent",
            className
          )}
          {...rest}
        />
      )}
    </div>
  );
}
