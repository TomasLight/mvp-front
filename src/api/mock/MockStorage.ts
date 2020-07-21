import { MenuItemsMockStorage } from "@api/mock/menu/MenuItemsMockStorage";
import { MenuMockStorage } from "@api/mock/menu/MenuMockStorage";
import { PageMockStorage } from "@api/mock/page/PageMockStorage";
import { UserMockStorage } from "@api/mock/user/UserMockStorage";
import { LandingConfigMockStorage } from "@api/mock/workspace/LandingConfigMockStorage";
import { WorkspaceMockStorage } from "@api/mock/workspace/WorkspaceMockStorage";

export class MockStorage {
    static user = UserMockStorage;

    static workspace = WorkspaceMockStorage;
    static landingConfig = LandingConfigMockStorage;

    static pages = PageMockStorage;

    static menu = MenuMockStorage;
    static menuItems = MenuItemsMockStorage;
}
