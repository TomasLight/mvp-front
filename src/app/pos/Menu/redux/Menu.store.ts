import { Cart, Category, Dish, Menu } from "@pos/Menu/models";

export class MenuStore {
    // public menu: Menu;
    // public menuIsLoading: boolean;

    public dishes: Dish[];
    public dishesAreLoading: boolean;

    public categories: Category[];
    public categoriesAreLoading: boolean;

    public selectedCategory: Category;

    public openedDish: Dish;
    public openedDishIsLoading: boolean;

    public cart: Cart;

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
