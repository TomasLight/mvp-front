import { AuthorizedUser } from "@admin/models";
import { LandingConfig, Workspace } from "@models";
import { DataServiceBase as ServiceBase } from "@utils/data";
import { Dish, Menu } from "@ws/Menu/models";

export abstract class DataServiceBase extends ServiceBase {
    protected _authorizedUser: AuthorizedUser;

    protected _landingConfig: LandingConfig;
    protected _workspaces: Workspace[];

    protected _menu: Menu;
    protected _dishes: Dish[];
}
