import { Equal, Expect } from "../helpers/type-utils";

const makeStatus = <TStatus extends string>(statuses: TStatus[]) => {
  return statuses;
};

// this seems like a ridiculous solution though. Isn't there a better way?
// const statuses = makeStatus([
//   "INFO" as const,
//   "DEBUG" as const,
//   "ERROR" as const,
//   "WARNING" as const,
// ]);
const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>
];
