import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function youSayGoodbyeISayHello<
  TGreet extends "hello" | "goodbye",
  TReturn = TGreet extends "hello" ? "goodbye" : "hello"
>(greeting: TGreet) {
  //I wonder whether there's a way where I don't have to cast this
  return (greeting === "goodbye" ? "hello" : "goodbye") as TReturn;
}

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
