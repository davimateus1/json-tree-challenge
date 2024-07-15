import { JSONValue } from "@/types";
import { jsonFormatter } from "@/utils";
import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataState {
  title: string;
  json: JSONValue;
}

export const App = () => {
  const [data, setData] = useState<DataState>({} as DataState);

  const handleSetJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;

      setData({ title: file.name, json: JSON.parse(result.toString()) });
    };

    reader.readAsText(file);
  };

  const clearData = () => {
    setData({} as DataState);
  };

  return (
    <div className="w-full min-h-svh bg-black flex justify-center items-center flex-col p-10 space-y-8">
      {data.json ? (
        <div className="flex justify-center flex-col items-center space-y-4">
          <Button onClick={clearData} className="bg-red-500 text-white">
            Clear Data
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-center text-white">
              {data.title}
            </h1>
            <div className="flex justify-center items-center">
              {jsonFormatter(data.json)}
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
        </>
      )}
    </div>
  );
};
