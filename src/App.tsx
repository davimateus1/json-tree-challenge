import { JSONValue } from "@/types";
import { EMPTY_PERCENT, FULL_PERCENT, JSONFormatter } from "./utils";

import { ChangeEvent, useState } from "react";
import { Input, Button, Progress } from "@/components/ui";

interface DataState {
  title: string;
  json: JSONValue;
}

export const App = () => {
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(EMPTY_PERCENT);
  const [{ json, title }, setData] = useState<DataState>({} as DataState);

  const handleSetJson = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        setProgress(percentLoaded);
      }
    };

    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (!result) return;

        setData({
          title: file.name,
          json: JSON.parse(String(result)),
        });
        setProgress(FULL_PERCENT);
      } catch {
        setError("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  const clearData = () => {
    setError("");
    setData({} as DataState);
    setProgress(EMPTY_PERCENT);
  };

  return (
    <div className="w-full min-h-svh max-h-svh bg-black flex items-center flex-col p-20 space-y-8 overflow-hidden">
      {json ? (
        <div className="flex justify-center flex-col items-center space-y-4">
          <Button onClick={clearData} className="bg-red-500 text-white">
            Clear Data
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-center text-white">
              {title}
            </h1>
            <div className="flex justify-center items-center">
              <JSONFormatter
                json={json}
                options={{ useColors: true, virtualize: true }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl text-center">
              JSON Tree Viewer
            </h1>
            <p className="text-white italic text-xl text-center">
              Simple JSON Viewer that runs completely on-client. No data
              exchange
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
      )}
    </div>
  );
};
