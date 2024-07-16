import { useState } from "react";
import { JSONValue } from "@/types";

import {
  FIXED_INDEX,
  FULL_PERCENT,
  START_INDEX,
  MAX_PERCENT_TO_LOAD,
} from "./contants";

interface FormatterOptions {
  useColors?: boolean;
  virtualize?: boolean;
}

interface JSONFormatterProps {
  json: JSONValue;
  options: FormatterOptions;
}

export const JSONFormatter = ({ json, options }: JSONFormatterProps) => {
  const { useColors = true, virtualize = false } = options;
  const [endIndex, setEndIndex] = useState(
    virtualize ? FIXED_INDEX : Object.keys(json).length
  );

  const formatObject = (obj: JSONValue, depth: number): JSX.Element => {
    const entries = Object.entries(obj);
    const isArray = Array.isArray(obj);

    return (
      <div>
        <span className="text-red-500">{isArray ? "[" : "{"}</span>
        {entries.slice(START_INDEX, endIndex).map(([key, value], index) => (
          <div key={key} className={`ml-4 border-l pl-2 depth-${depth % 5}`}>
            <span className={useColors ? "text-green-500" : ""}>{key}: </span>
            {typeof value === "object" && value !== null ? (
              formatObject(value, depth + 1)
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

    if (percent > MAX_PERCENT_TO_LOAD) {
      const newEndIndex = endIndex + FIXED_INDEX;
      setEndIndex(newEndIndex);
    }
  };

  return (
    <div
      className="h-[70vh] overflow-y-auto w-[70vw]"
      onScroll={virtualize ? handleScroll : undefined}
    >
      {formatObject(json, 1)}
    </div>
  );
};
