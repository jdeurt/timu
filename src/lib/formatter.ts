import type { Normalizable } from "../types/normalizable";
import { Unit } from "../types/unit";
import { getRemainders } from "../utils/get-remainders";
import { normalize } from "../utils/normalize";
import { pluralize } from "../utils/pluralize";
import { unitSuffixMap } from "../utils/unit-suffix-map";

export interface FormatterConfig {
    /**
     * The units that should be displayed.
     *
     * @default
     * [Unit.YEAR, Unit.MONTH, Unit.DAY]
     */
    significantUnits: Unit[];

    /**
     * Number of digits after the decimal point for the min significant time unit. Must be in the range 0 - 20, inclusive.
     *
     * @default 0
     */
    minSignificantUnitFractionDigits: number;

    /**
     * The mode to use when formatting the time units.
     *
     * @default "long"
     * @example
     * // "long" mode
     * "1 year, 3 weeks, and 2 days"
     *
     * // "short" mode
     * "1y 3w 2d"
     */
    mode: "short" | "long";
}

export const formatter =
    (config?: Partial<FormatterConfig>) =>
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (time: Normalizable) => {
        const n = normalize(time);

        const significantUnits =
            config?.significantUnits !== undefined &&
            config.significantUnits.length > 0
                ? config.significantUnits.sort((a, b) => b - a)
                : [Unit.YEAR, Unit.MONTH, Unit.DAY];
        const leastSignificantUnit =
            significantUnits[significantUnits.length - 1];

        const minSignificantUnitFractionDigits =
            config?.minSignificantUnitFractionDigits ?? 0;

        const mode = config?.mode ?? "long";

        const parts = getRemainders(significantUnits, n).filter(
            ([, _n]) => _n > 0
        );

        const minSignificantUnitBreakpoint =
            1 * 10 ** (-1 * minSignificantUnitFractionDigits);

        if (
            parts.length === 0 ||
            (parts.length === 1 && parts[0][1] < minSignificantUnitBreakpoint)
        ) {
            return `less than ${minSignificantUnitBreakpoint}${pluralize(
                minSignificantUnitBreakpoint,
                unitSuffixMap[leastSignificantUnit][mode]
            )}`;
        }

        if (parts.length === 1) {
            const [unit, _n] = parts[0];

            const value = _n.toFixed(minSignificantUnitFractionDigits);

            const suffix = unitSuffixMap[unit][mode];

            return value + pluralize(value, suffix);
        }

        const formatted = parts.map(([unit, _n]) => {
            const isLast = unit === leastSignificantUnit;

            const value = _n.toFixed(
                isLast ? minSignificantUnitFractionDigits : 0
            );

            const suffix = unitSuffixMap[unit][mode];

            if (mode === "long") {
                return (
                    (isLast ? "and " : "") + value + pluralize(value, suffix)
                );
            }

            return value + suffix;
        });

        return formatted.join(mode === "long" && parts.length > 2 ? ", " : " ");
    };
