import { Category, Dish } from "@ws/Menu/models";
import { Data } from "./Data";

export interface IMenuDataService {
    menuIdAsync(): Data<string>;
    categoriesAsync(): Data<Category[]>;
    dishesAsync(): Data<Dish[]>;
    dishByIdAsync(dishId: string): Data<Dish>;
}
