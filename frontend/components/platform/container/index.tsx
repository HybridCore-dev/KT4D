import clsx from "clsx";
import { Props } from "./typing";

export default function Container({ className, children }: Props) {
  return (
    <div className={clsx("container mx-auto px-4 md:px-0", className)}>
      {children}
    </div>
  );
}
