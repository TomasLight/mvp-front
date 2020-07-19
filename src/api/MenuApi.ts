import { IMenuItemDto, IMenuDto } from "@api/models/menu/responses";
import { ApiBase, ApiResponse, urlWithIds } from "@utils/api";

import { mockApi } from "./mock/menu";

export class MenuApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async getMenuAsync(menuId: string): Promise<ApiResponse<IMenuDto>> {
        const url = urlWithIds(process.env.API_GET_MENU, { menuId });
        return this.get<IMenuDto>(url);
    }

    static getDishesAsync(): Promise<ApiResponse<IMenuItemDto[]>> {
        return this.get<IMenuItemDto[]>(process.env.API_GET_MENU_ITEMS);
    }
}
