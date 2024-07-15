import { JSONValue } from "@/types";

interface FormatterOptions {
  useColors?: boolean;
}

export const jsonFormatter = (
  json: JSONValue,
  options: FormatterOptions = {}
): JSX.Element => {
  const { useColors = true } = options;

  const formatObject = (obj: JSONValue, depth: number): JSX.Element => {
    const isArray = Array.isArray(obj);
    const entries = Object.entries(obj);

    return (
      <div>
        <span className="text-red-500">{isArray ? "[" : "{"}</span>
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className="ml-4 border-l pl-2 border-gray-100 border-opacity-20"
          >
            <span className={useColors ? "text-green-500" : ""}>{key}: </span>
            {typeof value === "object" && value !== null ? (
              formatObject(value, depth)
            ) : (
              <span className={useColors ? "text-white" : ""}>
                {JSON.stringify(value)}
              </span>
            )}
            {index < entries.length - 1 && (
              <span className="text-white">,</span>
            )}
          </div>
        ))}
        <span className="text-red-200">{isArray ? "]" : "}"}</span>
      </div>
    );
  };

  return formatObject(json, 1);
};
