import type { Time } from "../lib/time";
import type { Unit } from "./unit";

export type Normalizable = number | Date | Time | [Unit, number][];
