import { it } from "vitest";

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

type EventsWithPayloads = keyof {
  [K in keyof Events as Events[K] extends {} ? K : never]: Events[K];
};
type EventsWithoutPayloads = keyof {
  [K in keyof Events as Events[K] extends {} ? never : K]: Events[K];
};

export function sendEvent<TEvent extends EventsWithoutPayloads>(
  event: TEvent
): void;
export function sendEvent<TEvent extends EventsWithPayloads>(
  event: TEvent,
  payload: Events[TEvent]
): void;
export function sendEvent(event: keyof Events, ...args: any[]) {
  // Send the event somewhere!
}

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
    // @ts-expect-error
    "focus",
    {}
  );
});
