import { Category, Dish } from "@ws/Menu/models";
import { Data } from "@utils/data/Data";

export interface IMenuDataService {
    categoriesAsync(): Data<Category[]>;
    dishesAsync(): Data<Dish[]>;
}
