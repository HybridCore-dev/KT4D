"use client";

import { useState } from "react";
import { Props } from "./typing";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "./components/button";

import _ from "lodash";

export default function Pagination({ count, page, onChange }: Props) {
  const [current, setCurrent] = useState(page ?? 0);

  const prev = () => {
    if (current > 0) handleChange(current - 1)();
  };

  const next = () => {
    if (current < count - 1) handleChange(current + 1)();
  };

  const handleChange = (page: number) => () => {
    setCurrent(page);
    if (onChange) onChange(page);
  };

  return (
    <div className="flex items-center">
      <Button disabled={current === 0} onClick={prev}>
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      {_.times(count).map((item) => (
        <Button
          onClick={handleChange(item)}
          active={current === item}
          key={item}
        >
          {item + 1}
        </Button>
      ))}
      <Button disabled={current === count - 1} onClick={next}>
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
