//Lol seems like it is not solvable with this approach ? I thought there was a way of doing it somehow but seems like Matt suggest using overloads (which to me seems sort of limited if you want to do many more fn compositions)
import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type LastFnArrayElement<T extends AnyFunction[]> = T extends [infer TFirst]
  ? TFirst extends AnyFunction
    ? TFirst
    : never
  : T extends [infer First, ...infer Rest]
  ? Rest extends AnyFunction[]
    ? LastFnArrayElement<Rest>
    : never
  : never;

type WrongFunctionChain =
  "[Error] - Functions should seamlessly feed their next function with their return type. Please check the order you passed your functions.";
type AnyFunction = (...args: any[]) => any;
type IsNever<T> = [T] extends [never] ? true : false;

type CheckValidFunctionOrder<
  T extends Array<AnyFunction>,
  TPreviousFunctionReturnType extends any[] = never
> = T extends [infer TFirst]
  ? IsNever<TPreviousFunctionReturnType> extends true
    ? true
    : TFirst extends AnyFunction
    ? TPreviousFunctionReturnType extends Parameters<TFirst>[0]
      ? true
      : false
    : never
  : T extends [infer TFirst, ...infer TRest]
  ? TRest extends AnyFunction[]
    ? TFirst extends AnyFunction
      ? CheckValidFunctionOrder<TRest, ReturnType<TFirst>>
      : never
    : never
  : never;
type ResolveTFnArray<T extends Array<AnyFunction>> =
  CheckValidFunctionOrder<T> extends true ? T : [WrongFunctionChain];

export const compose =
  <TFunctions extends [AnyFunction, ...Array<AnyFunction>]>(
    ...funcs: ResolveTFnArray<TFunctions>
  ) =>
  (input: Parameters<TFunctions[0]>[0]) => {
    return funcs.reduce((acc, fn) => fn(acc), input) as ReturnType<
      LastFnArrayElement<TFunctions>
    >;
  };

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(addOne, addOne, String);

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4);

  expect(result).toEqual("6");

  type tests = [Expect<Equal<typeof result, string>>];
});

it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne
  );
});
