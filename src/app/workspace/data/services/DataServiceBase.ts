import { LandingConfig } from "@models";
import { DataServiceBase as ServiceBase } from "@utils/data";
import { Dish, Menu } from "@ws/Menu/models";

export abstract class DataServiceBase extends ServiceBase{
    protected _landingConfig: LandingConfig;

    protected _menu: Menu;
    protected _dishes: Dish[];
}
