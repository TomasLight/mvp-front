import { IDishDto, IDishDetailsDto } from "@api/models/menu/responses";
import { Dish, DishDetails } from "@app/Menu/models";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";

import { mockApi } from "./mock/menu";

export class MenuApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    public static async getDishTagIds(): Promise<ApiResponse<number[]>> {
        const response = await this.get<number[]>("menu/tag");
        return response as ApiResponse<number[]>;
    }

    public static async getDishes(): Promise<ApiResponse<Dish[]>> {
        const response = await this.get<IDishDto[]>("menu/dish");
        if (response.data) {
            response.data = response.data.map((dto: IDishDto) => Mapper.map<Dish>(
                nameof<IDishDto>(),
                nameof<Dish>(),
                dto
            ));
        }
        return response as ApiResponse<Dish[]>;
    }

    public static async getDish(dishId: number): Promise<ApiResponse<DishDetails>> {
        const response = await this.get<IDishDetailsDto>(`menu/dish/${dishId}`);
        if (response.data) {
            response.data = Mapper.map<DishDetails>(
                nameof<IDishDetailsDto>(),
                nameof<DishDetails>(),
                response.data
            );
        }
        return response as ApiResponse<DishDetails>;
    }
}
