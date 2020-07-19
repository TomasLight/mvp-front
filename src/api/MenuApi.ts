import { IMenuItemDto, IMenuDto } from "@api/models/menu/responses";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { urlWithIds } from "@utils";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";

import { mockApi } from "./mock/menu";

export class MenuApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async getMenu(menuId: string): Promise<ApiResponse<Menu>> {
        const url = urlWithIds(process.env.API_GET_MENU, { menuId });

        const response: ApiResponse = await this.get<IMenuDto>(url);
        if (response.data) {
            response.data = Mapper.map<Menu>(
                nameof<IMenuDto>(),
                nameof<Menu>(),
                response.data
            );
        }
        return response as ApiResponse<Menu>;
    }

    static async getCategories(menuId: string): Promise<ApiResponse<Category[]>> {
        const response: ApiResponse = await this.getMenu(menuId);
        if (response.data) {
            const menu: Menu = response.data;
            response.data = menu.categories;
        }

        return response as ApiResponse<Category[]>;
    }

    static async getDishes(): Promise<ApiResponse<Dish[]>> {
        const response: ApiResponse = await this.get<IMenuItemDto[]>(process.env.API_GET_MENU_ITEMS);
        if (response.data) {
            response.data = response.data.map((dto: IMenuItemDto) => Mapper.map<Dish>(
                nameof<IMenuItemDto>(),
                nameof<Dish>(),
                dto
            ));
        }
        return response as ApiResponse<Dish[]>;
    }
}
