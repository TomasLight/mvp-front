import { Guid } from "@utils";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { Data } from "@utils/data/Data";
import { IMenuDataService } from "../IMenuDataService";
import { FakeServiceBase } from "./FakeServiceBase";

export class FakeMenuDataService extends FakeServiceBase implements IMenuDataService {
    constructor() {
        super();
        this.categoriesAsync = this.categoriesAsync.bind(this);
        this.dishesAsync = this.dishesAsync.bind(this);

        const menuGuid = Guid.generate();
        this.dishes = [
            new Dish({
                id: Guid.generate(),
                workspaceId: FakeServiceBase.DEFAULT_WORKSPACE_ID,
                created: "2020-07-07T20:15:48.283795+03:00",
                productIds: [
                    Guid.generate(),
                ],
                title: "Шаверма в тонком лаваше",
                image: "/images/shaurma_001.jpg",
                description: "Готовится по классике",
                price: 200,
            }),
        ];
        this.menu = new Menu({
            id: menuGuid,
            workspaceId: FakeServiceBase.DEFAULT_WORKSPACE_ID,
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

    async categoriesAsync(): Data<Category[]> {
        return Promise.resolve(this.menu.categories);
    }

    async dishesAsync(): Data<Dish[]> {
        return Promise.resolve(this.dishes);
    }
}
