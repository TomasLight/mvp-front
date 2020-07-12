import { Enum } from "./Enum";

export const IconVariant = Object.freeze({
    NA: 0,
    Avocado: 1,
    Burger: 2,
    Cart: 3,
    Coffee: 4,
    Fish: 5,
    ForkKnife: 6,
    HotDog: 7,
    Noodles: 8,
    PizzaSlice: 9,
    PepperHot: 10,
    Salad: 11,
    Sushi: 12,
});

export type IconVariant = Enum<typeof IconVariant>;
