import { JsonSectionProps } from "@/interfaces";
import { JsonFormatter } from "./JsonFormatter";
import { Button } from "./ui/button";

export const JsonSection = ({ title, json, clearData }: JsonSectionProps) => {
  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <Button onClick={clearData} className="bg-red-500 text-white">
        Clear Data
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-center text-white">{title}</h1>
        <div className="flex justify-center items-center">
          <JsonFormatter
            json={json}
            options={{ useColors: true, virtualize: true }}
          />
        </div>
      </div>
    </div>
  );
};
