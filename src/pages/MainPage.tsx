import { DataState } from "@/interfaces";
import { ChangeEvent, useState } from "react";

import { JsonSection, PresentationSection } from "@/components";
import { EMPTY_PERCENT, FULL_PERCENT, JSON_UPLOAD_ERROR } from "@/utils";

export const MainPage = () => {
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(EMPTY_PERCENT);
  const [{ json, title }, setData] = useState<DataState>({} as DataState);

  const handleSetJson = (e: ChangeEvent<HTMLInputElement>) => {
    clearData();

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

        setData({ title: file.name, json: JSON.parse(String(result)) });
        setProgress(FULL_PERCENT);
      } catch {
        setError(JSON_UPLOAD_ERROR);
      }
    };

    reader.readAsText(file);
  };

  const clearData = () => {
    setError("");
    setData({} as DataState);
    setProgress(EMPTY_PERCENT);
  };

  const jsonSectionProps = { title, json, clearData };
  const presentationSectionProps = { error, progress, json, handleSetJson };

  return (
    <div className="w-full min-h-svh max-h-svh bg-black flex items-center flex-col p-20 space-y-8 overflow-hidden">
      {json ? (
        <JsonSection {...jsonSectionProps} />
      ) : (
        <PresentationSection {...presentationSectionProps} />
      )}
    </div>
  );
};
