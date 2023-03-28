import type { Normalizable } from "../types/normalizable";

/**
 * Normaliza various different time formats to milliseconds
 */
export const normalize = (x: Normalizable) => {
    if (typeof x === "number") {
        return x;
    }

    if (x instanceof Date) {
        return x.getTime();
    }

    if (Array.isArray(x)) {
        return x.reduce((acc, [unit, value]) => acc + unit * value, 0);
    }

    return x.inMilliseconds;
};
