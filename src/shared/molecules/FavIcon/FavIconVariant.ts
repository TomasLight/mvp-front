import { Enum, IconVariant } from "@enums";

const FavIconVariant = Object.freeze({
    Avocado: IconVariant.Avocado,
    Burger: IconVariant.Burger,
    Cart: IconVariant.Cart,
    Coffee: IconVariant.Coffee,
    Fish: IconVariant.Fish,
    ForkKnife: IconVariant.ForkKnife,
    HotDog: IconVariant.HotDog,
    Noodles: IconVariant.Noodles,
    PizzaSlice: IconVariant.PizzaSlice,
    PepperHot: IconVariant.PepperHot,
    Salad: IconVariant.Salad,
    Sushi: IconVariant.Sushi,
});

type FavIconVariant = Enum<typeof FavIconVariant>;

export { FavIconVariant };
