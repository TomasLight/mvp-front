import { IMenuItemDto, IMenuDto, ICategoryDto } from "@api/models/menu/responses";
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
        const url = urlWithIds(process.env.API_GET_MENU_CATEGORIES, { menuId });

        const response: ApiResponse = await this.post<ICategoryDto[]>(url, { menuId });
        if (response.data) {
            response.data = response.data.map((dto: ICategoryDto) => Mapper.map<Category>(
                nameof<ICategoryDto>(),
                nameof<Category>(),
                dto
            ));
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

    static async getMenuItem(menuItemId: string): Promise<ApiResponse<Dish>> {
        const url = urlWithIds(process.env.API_GET_MENU_ITEM, { menuItemId });

        const response: ApiResponse = await this.get<IMenuItemDto>(url);
        if (response.data) {
            response.data = Mapper.map<Dish>(
                nameof<IMenuItemDto>(),
                nameof<Dish>(),
                response.data
            );
        }
        return response as ApiResponse<Dish>;
    }
}
