import { FavIconVariant } from "./FavIconVariant";

const faviconTags = new Map<number, string[]>([
    [ FavIconVariant.Avocado, [ "avocado", "авокадо" ] ],
    [ FavIconVariant.Burger, [ "burger", "бургер" ] ],
    [ FavIconVariant.Cart, [ "cart", "корзина" ] ],
    [ FavIconVariant.Coffee, [ "coffee", "кофе" ] ],
    [ FavIconVariant.Fish, [ "fish", "рыба" ] ],
    [ FavIconVariant.ForkKnife, [ "fork", "knife", "вилка", "нож" ] ],
    [ FavIconVariant.HotDog, [ "hotdog", "хотдог" ] ],
    [ FavIconVariant.Noodles, [ "noodles", "лапша", "тарелка" ] ],
    [ FavIconVariant.PizzaSlice, [ "pizza", "slice", "пицца", "кусок" ] ],
    [ FavIconVariant.PepperHot, [ "pepper", "hot", "перец" ] ],
    [ FavIconVariant.Salad, [ "salad", "салат" ] ],
    [ FavIconVariant.Sushi, [ "sushi", "суши" ] ],
]);

export { faviconTags };
