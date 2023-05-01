import { Equal, Expect } from "../helpers/type-utils";

type AnyFunction = (...args: any[]) => any;
type IsNever<T> = [T] extends [never] ? true : false;

type CheckValidFunctionOrder<
  T extends Array<AnyFunction>,
  TPreviousFunctionReturnType = never
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

// type ResolveTFnArray<T extends Array<AnyFunction>> =
//   CheckValidFunctionOrder<T> extends true ? T : [WrongFunctionChain];

type testValidFns = [
  (input: string) => number,
  (input: number) => number,
  (input: number) => string
];
type testInvalidFns = [(input: string) => number, (input: string) => string];

type resultTest = CheckValidFunctionOrder<testInvalidFns>;
//    ^?

type tests = [
  Expect<Equal<CheckValidFunctionOrder<testValidFns>, true>>,
  Expect<Equal<CheckValidFunctionOrder<testInvalidFns>, false>>
];

const addOne = (num: number) => {
  return num + 1;
};

const myStringParser = String(1);
type test = StringConstructor extends AnyFunction ? true : false;
//    ^?
type args = [typeof addOne, typeof addOne, StringConstructor];
type result = CheckValidFunctionOrder<args>;
//   ^?
type stringConstructorParams = Parameters<StringConstructor>[0];
//    ^?
type previousReturnType = ReturnType<typeof addOne>;
//    ^?
