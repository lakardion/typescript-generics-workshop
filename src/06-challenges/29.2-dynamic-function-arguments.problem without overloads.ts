import { it } from "vitest";

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

export const sendEvent = <TEventKey extends keyof Events>(
  event: TEventKey,
  // this is cool way of one-shot this challenge actually. I don't think I have ever done this sort of args thing before so it is nice to know that this is another way of solving it.
  ...args: Events[TEventKey] extends {} ? [payload: Events[TEventKey]] : []
) => {
  // Send the event somewhere!
};

it("Should force you to pass a second argument when you choose an event with a payload", () => {
  // @ts-expect-error
  sendEvent("click");

  sendEvent("click", {
    // @ts-expect-error
    x: "oh dear",
  });

  sendEvent(
    "click",
    // @ts-expect-error
    {
      y: 1,
    }
  );

  sendEvent("click", {
    x: 1,
    y: 2,
  });
});

it("Should prevent you from passing a second argument when you choose an event without a payload", () => {
  sendEvent("focus");

  sendEvent(
    "focus",
    // @ts-expect-error
    {}
  );
});
