import { Cart, Dish, DishDetails } from "@app/Menu/models";

export class MenuStore {
    public dishes: Dish[];
    public dishesAreLoading: boolean;

    public tagIds: number[];
    public tagIdsAreLoading: boolean;

    public selectedTagId: number;

    public openedDish: DishDetails;
    public openedDishIsLoading: boolean;

    public cart: Cart;

    constructor() {
        this.dishes = [];
        this.dishesAreLoading = false;

        this.tagIds = [];
        this.tagIdsAreLoading = false;

        this.selectedTagId = null;

        this.openedDish = null;
        this.openedDishIsLoading = false;

        this.cart = new Cart();
    }
}
