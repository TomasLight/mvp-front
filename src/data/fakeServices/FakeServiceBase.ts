import { AuthorizedUser, LandingConfig, UserWorkspace } from "@models";
import { Guid } from "@utils";
import { Dish, Menu } from "@ws/Menu/models";

export abstract class FakeServiceBase {
    protected static DEFAULT_WORKSPACE_ID = Guid.generate();

    protected authorizedUser: AuthorizedUser;

    protected landingConfig: LandingConfig;
    protected workspaces: UserWorkspace[];

    protected menu: Menu;
    protected dishes: Dish[];
}
