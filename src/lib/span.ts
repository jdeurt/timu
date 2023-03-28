import type { Normalizable } from "../types/normalizable";
import type { Time } from "./time";
import { normalize } from "../utils/normalize";
import { time as t } from "./time";

export interface Span {
    start: Time;
    end: Time;
    contains: (time: Normalizable) => boolean;
    overlaps: (other: Span) => boolean;
}

export const span = (from: Normalizable, to: Normalizable): Span => {
    const a = t(from);
    const b = t(to);

    return {
        start: a,
        end: b,
        contains: (time: Normalizable) =>
            a.inMilliseconds <= normalize(time) &&
            normalize(time) <= b.inMilliseconds,
        overlaps: (other: Span) => other.contains(a) || other.contains(b),
    };
};
