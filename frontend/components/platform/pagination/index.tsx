"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "./components/button";

const getRange = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function Pagination({ count, page, onChange }: any) {
  const [current, setCurrent] = useState(page ?? 0);

  useEffect(() => {
    setCurrent(page);
  }, [page]);

  const handleChange = (newPage: number) => {
    setCurrent(newPage);
    if (onChange) onChange(newPage);
  };

  const renderPages = () => {
    const totalNumbers = 5;
    const siblingCount = 1;

    if (count <= totalNumbers + 2) {
      return getRange(0, count - 1);
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 0);
    const rightSiblingIndex = Math.min(current + siblingCount, count - 1);

    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < count - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getRange(0, leftItemCount - 1);
      return [...leftRange, "DOTS", count - 1];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getRange(count - rightItemCount, count - 1);
      return [0, "DOTS", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
      return [0, "DOTS", ...middleRange, "DOTS", count - 1];
    }
  };

  const pages = renderPages();

  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={current === 0}
        onClick={() => handleChange(current - 1)}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

      {pages?.map((item, index) => {
        if (item === "DOTS") {
          return (
            <span key={`dots-${index}`} className="px-2">
              ...
            </span>
          );
        }

        return (
          <Button
            key={item}
            onClick={() => handleChange(item as number)}
            active={current === item}
          >
            {(item as number) + 1}
          </Button>
        );
      })}

      <Button
        disabled={current === count - 1}
        onClick={() => handleChange(current + 1)}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
