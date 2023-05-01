import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const pick = <TObject extends object, TKeys extends keyof TObject>(
  obj: TObject,
  picked: TKeys[]
) => {
  return picked.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as {
      [K in TKeys]: TObject[K];
    }
  );
};

it("Should pick the keys from the object", () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ["a", "b"]
  );

  expect(result).toEqual({ a: 1, b: 2 });

  type test = Expect<Equal<typeof result, { a: number; b: number }>>;
});

it("Should not allow you to pass keys which do not exist in the object", () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      "a",
      "b",
      // @ts-expect-error
      "d",
    ]
  );
});
