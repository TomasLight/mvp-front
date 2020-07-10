import { Enum } from "./Enum";

export const IconVariant = Object.freeze({
    NA: 0,
    Coffee: 1,
    PizzaSlice: 2,
    PepperHot: 3,
});

export type IconVariant = Enum<typeof IconVariant>;
