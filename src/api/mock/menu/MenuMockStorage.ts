import { MenuItemsMockStorage } from "@api/mock/menu/MenuItemsMockStorage";
import { WorkspaceMockStorage } from "@api/mock/workspace/WorkspaceMockStorage";
import { IMenuDto } from "@api/models/menu/responses";
import { Guid } from "@utils";

const menuGuid = Guid.generate();

export class MenuMockStorage {
    static menu: IMenuDto = {
        id: menuGuid,
        workspaceId: WorkspaceMockStorage.list()[0].id,
        restaurants: [
            Guid.generate(),
        ],
        created: "2020-07-07T20:15:48.283795+03:00",
        categories: [
            {
                id: Guid.generate(),
                menuId: menuGuid,
                items: [
                    MenuItemsMockStorage.list()[0].id,
                ],
                created: "2020-07-07T20:15:48.283795+03:00",
                name: "Шавухи",
            },
        ],
        name: "COVID-19",
    };

    static get() {
        return MenuMockStorage.menu;
    }
}
