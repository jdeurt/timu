export const pluralize = (
    n: number | string,
    singular: string,
    plural = singular + "s"
) => (n === 1 || n === "1" ? singular : plural);
