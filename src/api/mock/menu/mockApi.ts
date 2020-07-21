import { MockStorage } from "@api/mock/MockStorage";
import { ApiMethod } from "@utils/api";
import { UrlRegExp } from "@utils/api/UrlRegExp";

function mockApi(url: string, method: ApiMethod, data) {
    if (UrlRegExp.build(process.env.API_GET_MENU).test(url)) {
        return MockStorage.menu.get();
    }

    if (UrlRegExp.build(process.env.API_GET_MENU_ITEM).test(url)) {
        return MockStorage.menuItems.getById(data);
    }

    if (UrlRegExp.build(process.env.API_GET_MENU_ITEMS).test(url)) {
        return MockStorage.menuItems.list();
    }

    throw new Error(`Invalid (${url}) with ${method} method for MENU ${nameof(mockApi)}`);
}

export { mockApi };
