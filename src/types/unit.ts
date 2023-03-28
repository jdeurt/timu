/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
export enum Unit {
    MILLISECOND = 1,
    SECOND = 1000,
    MINUTE = 60_000,
    HOUR = 3_600_000,
    DAY = 86_400_000,
    WEEK = 604_800_000,
    MONTH = 2_592_000_000,
    YEAR = 31_536_000_000,
}

export type UnitString =
    | "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years"
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "year";
