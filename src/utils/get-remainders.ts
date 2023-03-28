/**
 * `units` is an array of units in descending order.
 */
export const getRemainders = <T extends number>(units: T[], n: number) => {
    const leastSignificantUnit = units[units.length - 1];

    const parts: [T, number][] = [];

    let consumed = 0;

    for (const unit of units) {
        if (unit === leastSignificantUnit) {
            parts.push([unit, (n - consumed) / unit]);
            break;
        }

        const curr = Math.floor((n - consumed) / unit);

        consumed += curr * unit;

        parts.push([unit, curr]);
    }

    return parts;
};
