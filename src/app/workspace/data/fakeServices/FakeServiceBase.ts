import { LandingConfig } from "@models";
import { Dish, Menu } from "@ws/Menu/models";

export abstract class FakeServiceBase {
    protected landingConfig: LandingConfig;
    protected menu: Menu;
    protected dishes: Dish[];
}
