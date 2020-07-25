import { MenuApi } from "@api";
import { IMenuDto, IMenuItemDto } from "@api/models/menu/responses";
import { ApiResponseStatus, Mapper } from "@utils";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { ActionProcessing } from "@utils/data/ActionProcessing";
import { Data } from "@utils/data/Data";
import { DataFailed } from "@utils/data/DataFailed";
import { IMenuDataService } from "../IMenuDataService";
import { DataServiceBase } from "./DataServiceBase";
import { WorkspaceDataService } from "./WorkspaceDataService";

export class MenuDataService extends DataServiceBase implements IMenuDataService {
    private static readonly STORAGE_MILLISECONDS = 10000;

    constructor() {
        super();
        this.categoriesAsync = this.categoriesAsync.bind(this);
        this.dishesAsync = this.dishesAsync.bind(this);
    }

    async categoriesAsync(): Data<Category[]> {
        const menu = await this.menuAsync();
        if (menu instanceof DataFailed) {
            return menu;
        }

        return menu.categories;
    }

    async dishesAsync(): Data<Dish[]> {
        if (this._dishes) {
            return this._dishes;
        }

        const response = await MenuApi.getDishesAsync();
        if (response.hasError()) {
            return this.failed(response);
        }

        this._dishes = response.data.map((dto: IMenuItemDto) => Mapper.map<Dish>(
            nameof<IMenuItemDto>(),
            nameof<Dish>(),
            dto
        ));

        setTimeout(() => {
            this._dishes = null;
        }, MenuDataService.STORAGE_MILLISECONDS);

        return this._dishes;
    }

    private async menuAsync(): Data<Menu> {
        if (this._menu) {
            return this._menu;
        }

        let menuId: string;
        if (this._landingConfig) {
            menuId = this._landingConfig.menuId;
        }
        else {
            const wsDataService = new WorkspaceDataService();
            const landingConfig = await wsDataService.landingConfigAsync();
            if (landingConfig instanceof DataFailed) {
                return landingConfig;
            }
            menuId = landingConfig.menuId;
        }

        const response = await MenuApi.getMenuAsync(menuId);
        if (response.hasError()) {
            if (response.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(response);
        }

        this._menu = Mapper.map<Menu>(
            nameof<IMenuDto>(),
            nameof<Menu>(),
            response.data
        );

        setTimeout(() => {
            this._menu = null;
        }, MenuDataService.STORAGE_MILLISECONDS);

        return this._menu;
    }
}
