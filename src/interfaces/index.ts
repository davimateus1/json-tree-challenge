import { JSONValue } from "@/types";
import { ChangeEvent } from "react";

export interface FormatterOptions {
  useColors?: boolean;
  virtualize?: boolean;
}

export interface JsonFormatterProps {
  json: JSONValue;
  options: FormatterOptions;
}

export interface DataState {
  title: string;
  json: JSONValue;
}

export interface JsonSectionProps {
  title: string;
  json: JSONValue;
  clearData: () => void;
}

export interface PresentationSectionProps {
  error: string;
  progress: number;
  json: JSONValue;
  handleSetJson: (e: ChangeEvent<HTMLInputElement>) => void;
}
