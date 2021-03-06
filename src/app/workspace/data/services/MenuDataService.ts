import { MenuApi } from "@api";
import { IMenuDto, IMenuItemDto } from "@api/models/menu/responses";
import { ApiResponseStatus, Mapper } from "@utils";
import { Category, Dish, Menu } from "@ws/Menu/models";
import { ActionProcessing } from "@utils/data/ActionProcessing";
import { Data } from "@utils/data/Data";
import { DataFailed } from "@utils/data/DataFailed";
import { IMenuDataService } from "../IMenuDataService";
import { DataServiceBase } from "./DataServiceBase";
import { LandingConfigDataService } from "./LandingConfigDataService";

export class MenuDataService extends DataServiceBase implements IMenuDataService {
    private static readonly STORAGE_MILLISECONDS = 10000;

    constructor() {
        super();
        this.menuIdAsync = this.menuIdAsync.bind(this);
        this.categoriesAsync = this.categoriesAsync.bind(this);
        this.dishesAsync = this.dishesAsync.bind(this);
        this.dishByIdAsync = this.dishByIdAsync.bind(this);
    }

    async menuIdAsync(): Data<string> {
        const menu = await this.menuAsync();
        if (menu instanceof DataFailed) {
            return menu;
        }

        return menu.id;
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


    async dishByIdAsync(dishId: string): Data<Dish> {
        const dishes = await this.dishesAsync();
        if (dishes instanceof DataFailed) {
            return dishes;
        }

        const dish: Dish = dishes.find(_dish => _dish.id === dishId);
        return dish;
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
            const landingConfigDataService = new LandingConfigDataService();
            const landingConfig = await landingConfigDataService.landingConfigAsync();
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
