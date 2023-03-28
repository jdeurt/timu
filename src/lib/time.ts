import type { FormatterConfig } from "./formatter";
import type { Normalizable } from "../types/normalizable";
import type { Span } from "./span";
import { Unit } from "../types/unit";
import type { UnitString } from "../types/unit";
import { formatter } from "./formatter";
import { normalize } from "../utils/normalize";
import { span } from "./span";

export interface Time {
    inMilliseconds: number;
    inSeconds: number;
    inMinutes: number;
    inHours: number;
    inDays: number;
    inWeeks: number;
    inMonths: number;
    inYears: number;

    until: (other: Normalizable) => Time;
    since: (other: Normalizable) => Time;

    spanTo: (other: Normalizable) => Span;
    spanFrom: (other: Normalizable) => Span;

    format: (config?: Partial<FormatterConfig>) => string;
}

export const time = (
    x: Normalizable,
    unit: Unit | UnitString = Unit.MILLISECOND
): Time => {
    const u =
        typeof unit === "string"
            ? {
                  years: Unit.YEAR,
                  year: Unit.YEAR,
                  months: Unit.MONTH,
                  month: Unit.MONTH,
                  weeks: Unit.WEEK,
                  week: Unit.WEEK,
                  days: Unit.DAY,
                  day: Unit.DAY,
                  hours: Unit.HOUR,
                  hour: Unit.HOUR,
                  minutes: Unit.MINUTE,
                  minute: Unit.MINUTE,
                  seconds: Unit.SECOND,
                  second: Unit.SECOND,
                  milliseconds: Unit.MILLISECOND,
                  millisecond: Unit.MILLISECOND,
              }[unit]
            : unit;

    const n = normalize(x) * u;

    return {
        inMilliseconds: n,
        inSeconds: n / Unit.SECOND,
        inMinutes: n / Unit.MINUTE,
        inHours: n / Unit.HOUR,
        inDays: n / Unit.DAY,
        inWeeks: n / Unit.WEEK,
        inMonths: n / Unit.MONTH,
        inYears: n / Unit.YEAR,

        until: (other: Normalizable) => time(normalize(other) - n),
        since: (other: Normalizable) => time(n - normalize(other)),

        spanTo: (other: Normalizable) => span(n, other),
        spanFrom: (other: Normalizable) => span(other, n),

        format: (config?: Partial<FormatterConfig>) => formatter(config)(n),
    };
};
