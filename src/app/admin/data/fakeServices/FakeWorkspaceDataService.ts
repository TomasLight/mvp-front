import {
    ContentConfig,
    LandingConfig,
    SiteConfig,
    Workspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { FavIconUrlResolver } from "@shared/molecules";
import { brandColors } from "@shared/theme";
import { FileHelper, Guid } from "@utils";
import { Data } from "@utils/data/Data";
import { DataFailed } from "@utils/data/DataFailed";
import { IWorkspaceDataService } from "../IWorkspaceDataService";
import { FakeServiceBase } from "./FakeServiceBase";

export class FakeWorkspaceDataService extends FakeServiceBase implements IWorkspaceDataService {
    constructor() {
        super();
        this.siteConfigAsync = this.siteConfigAsync.bind(this);
        this.contentConfigAsync = this.contentConfigAsync.bind(this);
        this.hasWorkspaceAsync = this.hasWorkspaceAsync.bind(this);
        this.createConfigAsync = this.createConfigAsync.bind(this);
        this.updateSiteAsync = this.updateSiteAsync.bind(this);
        this.updateDataAsync = this.updateDataAsync.bind(this);
        this.updateContentAsync = this.updateContentAsync.bind(this);

        this.workspaces = [
            new Workspace({
                role: "owner",
                id: FakeServiceBase.DEFAULT_WORKSPACE_ID,
                domain: "shaurma-zbs",
                name: "Сеть шаурмяшен у дома",
            }),
        ];
        this.landingConfig = new LandingConfig({
            id: Guid.generate(),
            workspaceId: FakeServiceBase.DEFAULT_WORKSPACE_ID,
            menuId: Guid.generate(),
            siteConfig: new SiteConfig({
                name: "Шаурма ZBS",
                faviconUrl: "/images/favicons/avocado.svg",
                openGraphImageUrl: "/images/image_001.png",
                openGraphTitle: "Vk постик",
                color: brandColors.get(4).color,
            }),
            dataConfig: {},
            contentConfig: new ContentConfig({
                firstPhotoUrl: "/images/image_001.png",
                firstText: "Шаурма First Text",
                phone: "004",
                address: "СПБ",
                deliveryTime: "40 минут",
                deliveryMapUrl: "https://yandex.ru",
            }),
        });
    }

    async siteConfigAsync(): Data<SiteConfig> {
        return Promise.resolve(this.landingConfig.siteConfig);
    }

    async contentConfigAsync(): Data<ContentConfig> {
        return Promise.resolve(this.landingConfig.contentConfig);
    }

    async listAsync(): Data<Workspace[]> {
        return Promise.resolve(this.workspaces);
    }

    async currentWorkspaceAsync(): Data<Workspace> {
        const workspaces = await this.listAsync();
        if (workspaces instanceof DataFailed) {
            return workspaces;
        }

        return workspaces[0];
    }

    async hasWorkspaceAsync(): Data<boolean> {
        const workspaces = await this.listAsync();
        if (workspaces instanceof DataFailed) {
            return workspaces;
        }

        return !!workspaces.length;
    }

    async createConfigAsync(settings: WorkspaceSiteSettings): Data<Workspace> {
        const workspace = new Workspace({
            domain: settings.domain,
            id: Guid.generate(),
            name: settings.siteName,
            role: "owner",
        });
        this.landingConfig = new LandingConfig({
            id: Guid.generate(),
            menuId: Guid.generate(),
            workspaceId: Guid.generate(),
            siteConfig: new SiteConfig({
                name: settings.siteName,
                faviconUrl: FavIconUrlResolver.getUrl(settings.favicon),
                openGraphImageUrl: await FileHelper.toBase64(settings.openGraphImage),
                openGraphTitle: settings.openGraphTitle,
                color: settings.primaryColor,
            }),
            dataConfig: {},
            contentConfig: new ContentConfig(),
        });

        this.workspaces.push(workspace);
        return workspace;
    }

    async updateSiteAsync(settings: WorkspaceSiteSettings): Data<SiteConfig> {
        const { siteConfig } = this.landingConfig;

        if (settings.siteName) {
            siteConfig.name = settings.siteName;
        }
        if (settings.domain) {
            const workspace = this.workspaces.find(ws => ws.id === this.landingConfig.workspaceId);
            workspace.domain = settings.domain;
        }
        if (settings.favicon) {
            siteConfig.faviconUrl = FavIconUrlResolver.getUrl(settings.favicon);
        }
        if (settings.openGraphImage) {
            siteConfig.openGraphImageUrl = await FileHelper.toBase64(settings.openGraphImage);
        }
        if (settings.openGraphTitle) {
            siteConfig.openGraphTitle = settings.openGraphTitle;
        }
        if (settings.primaryColor) {
            siteConfig.color = settings.primaryColor;
        }

        return this.landingConfig.siteConfig;
    }

    async updateDataAsync(settings: WorkspaceDataSettings): Data<null> {
        return null;
    }

    async updateContentAsync(settings: WorkspaceContentSettings): Data<ContentConfig> {
        const { contentConfig } = this.landingConfig;

        if (settings.photo) {
            contentConfig.firstPhotoUrl = await FileHelper.toBase64(settings.photo);
        }
        if (settings.firstBlockText) {
            contentConfig.firstText = settings.firstBlockText;
        }
        if (settings.phone) {
            contentConfig.phone = settings.phone;
        }
        if (settings.address) {
            contentConfig.address = settings.address;
        }
        if (settings.deliveryTime) {
            contentConfig.deliveryTime = settings.deliveryTime;
        }
        if (settings.deliveryLocationLink) {
            contentConfig.deliveryMapUrl = settings.deliveryLocationLink;
        }

        return contentConfig;
    }
}
