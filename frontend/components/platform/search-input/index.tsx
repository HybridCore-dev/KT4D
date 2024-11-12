"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "../button";
import { useSearchParams } from "next/navigation";
import { Props } from "./typing";

export default function SearchInput({ value: defaultValue, onChange }: Props) {
  const searchParams = useSearchParams();

  const ref = useRef<HTMLInputElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [value, setValue] = useState(
    defaultValue ?? searchParams.get("searchText") ?? ""
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) clearTimeout(timer.current);

    setValue(event.target.value);
    if (onChange) onChange(event.target.value);

    timer.current = setTimeout(function () {
      ref.current?.form?.requestSubmit();
    }, 1000);
  };

  useEffect(() => {
    const searchText = searchParams.get("searchText") ?? "";
    if (searchText === "" && value !== "") setValue("");

    return () => {};
  }, [searchParams]);

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type="text"
        name="searchText"
        placeholder="Search"
        className="w-full px-4 py-2 pl-10 border border-secondary-light/20 rounded-md bg-transparent"
        value={value}
        onChange={handleChange}
      />
      <Button
        variant="text"
        className="absolute left-3 top-2.5"
        disabled={value.length === 0}
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </Button>
    </div>
  );
}
