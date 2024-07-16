import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

import { EMPTY_PERCENT, FULL_PERCENT } from "@/utils";
import { PresentationSectionProps } from "@/interfaces";

export const PresentationSection = ({
  json,
  error,
  progress,
  handleSetJson,
}: PresentationSectionProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-4xl text-center">
          JSON Tree Viewer
        </h1>
        <p className="text-white italic text-xl text-center">
          Simple JSON Viewer that runs completely on-client. No data exchange
        </p>
      </div>
      <Input
        type="file"
        accept=".json"
        className="w-2/4"
        onChange={handleSetJson}
      />
      {error && <p className="text-red-500 text-center text-xl">{error}</p>}

      {progress > EMPTY_PERCENT && !json && !error && (
        <div className="w-full flex justify-center flex-col items-center">
          <Progress value={progress} className="w-2/4" />
          {progress === FULL_PERCENT ? (
            <span className="text-green-500">Done!</span>
          ) : (
            <span className="text-white">{progress}% Uploaded</span>
          )}
        </div>
      )}
    </>
  );
};
