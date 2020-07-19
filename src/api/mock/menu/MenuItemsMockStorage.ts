import { WorkspaceMockStorage } from "@api/mock/workspace/WorkspaceMockStorage";
import { IMenuItemDto } from "@api/models/menu/responses";
import { Guid } from "@utils";

export class MenuItemsMockStorage {
    static menuItems: IMenuItemDto[] = [
        {
            id: Guid.generate(),
            workspaceId: WorkspaceMockStorage.list()[0].id,
            created: "2020-07-07T20:15:48.283795+03:00",
            products: [
                Guid.generate(),
            ],
            name: "Шаурмяха (в защитном лаваше)",
            imageUrl: "/images/shaurma_001.jpg",
            description: "Готовится по класеке",
            price: 200,
        },
    ];

    static list() {
        return MenuItemsMockStorage.menuItems;
    }

    static getById(menuItemId: string) {
        return MenuItemsMockStorage.menuItems.find(
            (menuItem) => menuItem.id === menuItemId
        );
    }
}
