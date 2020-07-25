import { AuthorizedUser } from "@admin/models";
import { LandingConfig, Workspace } from "@models";
import { Guid } from "@utils";
import { Dish, Menu } from "@ws/Menu/models";

export abstract class FakeServiceBase {
    protected static DEFAULT_WORKSPACE_ID = Guid.generate();

    protected authorizedUser: AuthorizedUser;

    protected landingConfig: LandingConfig;
    protected workspaces: Workspace[];

    protected menu: Menu;
    protected dishes: Dish[];
}
