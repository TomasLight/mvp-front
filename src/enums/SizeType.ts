import { Enum } from "./Enum";

export const SizeType = Object.freeze({
    NA: 0,
    Milliliter: 1,
    Liter: 2,
    Gram: 3,
    Kilogram: 4,
});

export type SizeType = Enum<typeof SizeType>;
