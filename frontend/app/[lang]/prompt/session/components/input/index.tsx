"use client";

import IconButton from "@/components/platform/icon-button";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Props } from "./typing";
import useDictionary from "@/hooks/useDictionary";

export default function Input({ disabled, onSubmit }: Props) {
  const { dictionary } = useDictionary();
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSubmit();
  };

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="userMessage"
        placeholder={dictionary.prompt.session.inputPlaceholder}
        className="h-16 border border-white rounded-full bg-transparent w-full ps-6 pr-20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white"
        disabled={disabled}
        value={text}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div className="absolute top-2.5 right-2.5 ">
        <IconButton
          type="submit"
          size="large"
          disabled={disabled || text.length === 0}
          aria-disabled={disabled}
          className="w-11 h-11"
          onClick={handleSubmit}
        >
          <ArrowUpIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
}
