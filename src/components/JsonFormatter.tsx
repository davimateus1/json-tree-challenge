import "@/styles/scrollbar.css";

import { useState } from "react";
import { JSONValue } from "@/types";
import { JsonFormatterProps } from "@/interfaces";

import {
  MIN_DEPTH,
  FIXED_INDEX,
  START_INDEX,
  FULL_PERCENT,
  MAX_PERCENT_TO_LOAD,
} from "@/utils";

export const JsonFormatter = ({ json, options }: JsonFormatterProps) => {
  const keysLength = Object.keys(json).length;
  const { useColors = true, virtualize = false } = options;

  const [endIndex, setEndIndex] = useState(
    virtualize ? FIXED_INDEX : keysLength
  );

  const formatObject = (obj: JSONValue, depth: number): JSX.Element => {
    const isArray = Array.isArray(obj);
    const entries = Object.entries(obj);

    return (
      <div>
        <span className="text-red-500">{isArray ? "[" : "{"}</span>
        {entries.slice(START_INDEX, endIndex).map(([key, value], index) => (
          <div key={key} className={`ml-4 border-l pl-2 depth-${depth % 5}`}>
            <span className={useColors ? "text-green-500" : ""}>{key}: </span>
            {typeof value === "object" && value !== null ? (
              formatObject(value, depth++)
            ) : (
              <span className={useColors ? "text-yellow-500" : ""}>
                {JSON.stringify(value)}
              </span>
            )}
            {index < entries.length - 1 && (
              <span className="text-white">,</span>
            )}
          </div>
        ))}
        <span className="text-red-500">{isArray ? "]" : "}"}</span>
      </div>
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!virtualize) return;

    const target = e.target as HTMLDivElement;
    const scroll = target.scrollTop;

    const total = target.scrollHeight - target.clientHeight;
    const percent = (scroll / total) * FULL_PERCENT;

    if (percent > MAX_PERCENT_TO_LOAD && endIndex < keysLength) {
      const newEndIndex = endIndex + FIXED_INDEX;
      setEndIndex(newEndIndex);
    }
  };

  return (
    <div
      className="h-[70vh] overflow-y-auto w-[70vw]"
      onScroll={virtualize ? handleScroll : undefined}
    >
      {formatObject(json, MIN_DEPTH)}
    </div>
  );
};
