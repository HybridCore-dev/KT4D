"use client";

import { useFormStatus } from "react-dom";
import Button from "../button";
import { Props } from "../button/typing";
import useDictionary from "@/hooks/useDictionary";

export default function SubmitButton({ children, ...rest }: Props) {
  const { pending } = useFormStatus();
  const { dictionary } = useDictionary();

  return (
    <Button
      type="submit"
      size="large"
      disabled={pending}
      aria-disabled={pending}
      {...rest}
    >
      {children !== undefined
        ? children
        : pending
        ? dictionary.shared.submitting
        : dictionary.shared.submit}
    </Button>
  );
}
