import { Unit } from "../types/unit";

export const unitSuffixMap = {
    [Unit.YEAR]: {
        long: " year",
        short: "y",
    },
    [Unit.MONTH]: {
        long: " month",
        short: "mo",
    },
    [Unit.WEEK]: {
        long: " week",
        short: "w",
    },
    [Unit.DAY]: {
        long: " day",
        short: "d",
    },
    [Unit.HOUR]: {
        long: " hour",
        short: "h",
    },
    [Unit.MINUTE]: {
        long: " minute",
        short: "m",
    },
    [Unit.SECOND]: {
        long: " second",
        short: "s",
    },
    [Unit.MILLISECOND]: {
        long: " millisecond",
        short: "ms",
    },
};
