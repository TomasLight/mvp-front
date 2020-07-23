import { AuthorizedUser, LandingConfig, Workspace } from "@models";
import { ApiResponse } from "@utils";
import { Dish, Menu } from "@ws/Menu/models";
import { ActionProcessing } from "../ActionProcessing";
import { DataFailed } from "../DataFailed";

export abstract class DataServiceBase {
    protected _authorizedUser: AuthorizedUser;

    protected _landingConfig: LandingConfig;
    protected _workspaces: Workspace[];

    protected _menu: Menu;
    protected _dishes: Dish[];

    constructor() {
        this.failed = this.failed.bind(this);
    }

    protected failed(response: ApiResponse): DataFailed {
        const actionProcessing = new ActionProcessing("display");
        if (response.hasClientError()) {
            actionProcessing.addWarning();
        }
        else {
            actionProcessing.addError();
        }

        return new DataFailed({
            actionProcessing,
            message: response.error,
        });
    }
}
