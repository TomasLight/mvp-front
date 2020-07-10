import { Cart, Category, Dish, Menu } from "@ws/Menu/models";

export class MenuStore {
    // menu: Menu;
    // menuIsLoading: boolean;

    dishes: Dish[];
    dishesAreLoading: boolean;

    categories: Category[];
    categoriesAreLoading: boolean;

    selectedCategory: Category;

    openedDish: Dish;
    openedDishIsLoading: boolean;

    cart: Cart;

    constructor() {
        // this.menu = new Menu();
        // this.menuIsLoading = false;

        this.dishes = [];
        this.dishesAreLoading = false;

        this.categories = [];
        this.categoriesAreLoading = false;

        this.selectedCategory = null;

        this.openedDish = null;
        this.openedDishIsLoading = false;

        this.cart = new Cart();
    }
}
