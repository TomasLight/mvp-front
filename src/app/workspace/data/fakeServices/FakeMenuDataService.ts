import { Guid } from "@utils/Guid";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { Data } from "@utils/data/Data";
import { IMenuDataService } from "../IMenuDataService";
import { FakeServiceBase } from "./FakeServiceBase";

export class FakeMenuDataService extends FakeServiceBase implements IMenuDataService {
    constructor() {
        super();
        this.menuIdAsync = this.menuIdAsync.bind(this);
        this.categoriesAsync = this.categoriesAsync.bind(this);
        this.dishesAsync = this.dishesAsync.bind(this);
        this.dishByIdAsync = this.dishByIdAsync.bind(this);

        const menuGuid = Guid.generate();
        const workspaceId = Guid.generate();
        this.dishes = [
            new Dish({
                id: Guid.generate(),
                workspaceId,
                created: "2020-07-07T20:15:48.283795+03:00",
                productIds: [
                    Guid.generate(),
                ],
                title: "Шаурмяха (в защитном лаваше)",
                image: "/images/shaurma_001.jpg",
                description: "Готовится по класеке",
                price: 200,
            }),
        ];
        this.menu = new Menu({
            id: menuGuid,
            workspaceId,
            restaurants: [
                Guid.generate(),
            ],
            created: "2020-07-07T20:15:48.283795+03:00",
            categories: [
                new Category({
                    id: Guid.generate(),
                    menuId: menuGuid,
                    dishIds: [
                        this.dishes[0].id,
                    ],
                    created: "2020-07-07T20:15:48.283795+03:00",
                    name: "Кофе",
                }),
            ],
            name: "Любимое меню",
        });
    }

    async menuIdAsync(): Data<string> {
        return Promise.resolve(this.menu.id);
    }

    async categoriesAsync(): Data<Category[]> {
        return Promise.resolve(this.menu.categories);
    }

    async dishesAsync(): Data<Dish[]> {
        return Promise.resolve(this.dishes);
    }

    async dishByIdAsync(dishId: string): Data<Dish> {
        const dish = this.dishes.find(_dish => _dish.id === dishId);
        return Promise.resolve(dish);
    }
}
