import { FavIconVariant } from "@shared/molecules";

export class FavIconUrlResolver {
    static getUrl(variant: FavIconVariant): string {
        switch (variant) {
            case FavIconVariant.Avocado:
                return "/images/favicons/avocado.svg";

            case FavIconVariant.Burger:
                return "/images/favicons/burger.svg";

            case FavIconVariant.Cart:
                return "/images/favicons/cart.svg";

            case FavIconVariant.Coffee:
                return "/images/favicons/coffee.svg";

            case FavIconVariant.HotDog:
                return "/images/favicons/hotdog.svg";

            case FavIconVariant.Fish:
                return "/images/favicons/fish.svg";

            case FavIconVariant.ForkKnife:
                return "/images/favicons/fork-knife.svg";

            case FavIconVariant.Noodles:
                return "/images/favicons/noodles.svg";

            case FavIconVariant.PepperHot:
                return "/images/favicons/pepper-hot.svg";

            case FavIconVariant.PizzaSlice:
                return "/images/favicons/pizza-slice.svg";

            case FavIconVariant.Salad:
                return "/images/favicons/salad.svg";

            case FavIconVariant.Sushi:
                return "/images/favicons/sushi.svg";

            default:
                throw new Error(`Invalid favicon variant (${variant})`);
        }
    }

    static getVariant(url: string): FavIconVariant {
        switch (url) {
            case "/images/favicons/avocado.svg":
                return FavIconVariant.Avocado;

            case "/images/favicons/burger.svg":
                return FavIconVariant.Burger;

            case "/images/favicons/cart.svg":
                return FavIconVariant.Cart;

            case "/images/favicons/coffee.svg":
                return FavIconVariant.Coffee;

            case "/images/favicons/hotdog.svg":
                return FavIconVariant.HotDog;

            case "/images/favicons/fish.svg":
                return FavIconVariant.Fish;

            case "/images/favicons/fork-knife.svg":
                return FavIconVariant.ForkKnife;

            case "/images/favicons/noodles.svg":
                return FavIconVariant.Noodles;

            case "/images/favicons/pepper-hot.svg":
                return FavIconVariant.PepperHot;

            case "/images/favicons/pizza-slice.svg":
                return FavIconVariant.PizzaSlice;

            case "/images/favicons/salad.svg":
                return FavIconVariant.Salad;

            case "/images/favicons/sushi.svg":
                return FavIconVariant.Sushi;

            // api response
            case null:
                return null;

            default:
                throw new Error(`Invalid url (${url}) for favicon`);
        }
    }
}
