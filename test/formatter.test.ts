import test from "ava";

import { formatter, FormatterConfig } from "../src/lib/formatter";
import { Normalizable } from "../src/types/normalizable";
import { Unit } from "../src/types/unit";

const cases = [
    {
        input: [
            [Unit.YEAR, 1],
            [Unit.MONTH, 2],
            [Unit.DAY, 3],
        ],
        config: {},
        expected: "1 year, 2 months, and 3 days",
    },
    {
        input: [
            [Unit.YEAR, 1],
            [Unit.MONTH, 2],
            [Unit.DAY, 15],
        ],
        config: {
            significantUnits: [Unit.YEAR, Unit.MONTH],
            minSignificantUnitFractionDigits: 1,
        },
        expected: "1 year and 2.5 months",
    },
    {
        input: [
            [Unit.YEAR, 1],
            [Unit.MONTH, 2],
            [Unit.DAY, 15],
        ],
        config: { significantUnits: [Unit.YEAR, Unit.MONTH], mode: "short" },
        expected: "1y 3mo",
    },
    {
        input: [[Unit.YEAR, 0.5]],
        config: { significantUnits: [Unit.YEAR] },
        expected: "less than 1 year",
    },
    {
        input: [[Unit.YEAR, 0.5]],
        config: {
            significantUnits: [Unit.YEAR],
            minSignificantUnitFractionDigits: 1,
        },
        expected: "0.5 years",
    },
    {
        input: [[Unit.YEAR, 0.07]],
        config: {
            significantUnits: [Unit.YEAR],
            minSignificantUnitFractionDigits: 1,
        },
        expected: "less than 0.1 years",
    },
    {
        input: [[Unit.MONTH, 1.5]],
        config: { significantUnits: [Unit.MONTH, Unit.DAY] },
        expected: "1 month and 15 days",
    },
] satisfies {
    input: Normalizable;
    config: Partial<FormatterConfig>;
    expected: string;
}[];

test("should format times", (t) => {
    for (const testCase of cases) {
        const actual = formatter(testCase.config)(testCase.input);

        t.is(actual, testCase.expected);
    }
});
