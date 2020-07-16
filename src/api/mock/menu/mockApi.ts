import { IMenuItemDto } from "@api/models/menu/responses";
import { ApiMethod } from "@utils";
import { UrlRegExp } from "@utils/api/UrlRegExp";

import { menuItems } from "./menuItems";
import { menu } from "./menu";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_MENU).test(url)) {
        return menu;
    }

    if (UrlRegExp.build(process.env.API_GET_MENU_ITEM).test(url)) {
        return getMenuItem(data);
    }

    if (UrlRegExp.build(process.env.API_GET_MENU_ITEMS).test(url)) {
        return menuItems;
    }

    throw new Error(`Invalid (${url}) with ${method} method for MENU ${nameof(mockApi)}`);
}

function getMenuItem(menuItemId: string): IMenuItemDto {
    return menuItems.find((menuItem) => menuItem.id === menuItemId);
}

export { mockApi };
