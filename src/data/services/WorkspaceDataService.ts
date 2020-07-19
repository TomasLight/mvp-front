import { WorkspaceApi } from "@api/WorkspaceApi";
import {
    ContentConfig, DataConfig,
    LandingConfig,
    SiteConfig,
    UserWorkspace, WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { CreatedWorkspace } from "@models/wokrspaces/CreatedWorkspace";
import { ApiResponseStatus } from "@utils";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ActionProcessing } from "../ActionProcessing";
import { DataFailed } from "../DataFailed";
import { DataServiceBase } from "../DataServiceBase";

type Data<TModel> = Promise<DataFailed | TModel>;

export class WorkspaceDataService extends DataServiceBase {
    private static readonly STORAGE_MILLISECONDS = 1000;
    private _landingConfig: LandingConfig;
    private _workspaces: UserWorkspace[];

    constructor() {
        super();
        this.siteConfigAsync = this.siteConfigAsync.bind(this);
        this.contentConfigAsync = this.contentConfigAsync.bind(this);
        this.menuIdAsync = this.menuIdAsync.bind(this);
        this.listAsync = this.listAsync.bind(this);
        this.getByIdAsync = this.getByIdAsync.bind(this);
        this.getByDomainAsync = this.getByDomainAsync.bind(this);
        this.createAsync = this.createAsync.bind(this);
        this.updateSiteAsync = this.updateSiteAsync.bind(this);
        this.updateContentAsync = this.updateContentAsync.bind(this);
    }

    async siteConfigAsync(): Data<SiteConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        return landingConfig.siteConfig;
    }

    async contentConfigAsync(): Data<ContentConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        return landingConfig.contentConfig;
    }

    async menuIdAsync(): Data<string> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        return landingConfig.menuId;
    }

    async listAsync(): Data<UserWorkspace[]> {
        const workspacesResponse = await WorkspaceApi.getWorkspaces();
        if (workspacesResponse.hasError()) {
            if (workspacesResponse.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(workspacesResponse);
        }

        this._workspaces = workspacesResponse.data;
        setTimeout(() => {
            this._workspaces = null;
        }, WorkspaceDataService.STORAGE_MILLISECONDS);
        return this._workspaces;
    }

    async getByIdAsync(workspaceId: string): Data<UserWorkspace> {
        const workspaces = await this.listAsync();
        if (workspaces instanceof DataFailed) {
            return workspaces;
        }

        const workspace = workspaces.find(ws => ws.id === workspaceId);
        return workspace;
    }

    async getByDomainAsync(domain: string): Data<UserWorkspace> {
        const workspaces = await this.listAsync();
        if (workspaces instanceof DataFailed) {
            return workspaces;
        }

        const workspace = workspaces.find(ws => ws.domainName === domain);
        return workspace;
    }

    async createAsync(settings: WorkspaceSiteSettings): Data<UserWorkspace> {
        const createdWorkspaceResponse: ApiResponse<CreatedWorkspace> = await WorkspaceApi.create(settings);

        if (createdWorkspaceResponse.hasError()) {
            return this.failed(createdWorkspaceResponse);
        }

        const { name, domain } = createdWorkspaceResponse.data;

        const workspace = await this.getByDomainAsync(domain);
        if (workspace instanceof DataFailed) {
            return workspace;
        }

        this._workspaces.push({
            domainName: domain,
            id: workspace.id,
            name,
            role: workspace.role,
        });

        return workspace;
    }

    async updateSiteAsync(settings: WorkspaceSiteSettings): Data<SiteConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        const response: ApiResponse = await WorkspaceApi.updateSiteSettings(
            landingConfig.workspaceId,
            landingConfig.id,
            settings
        );
        if (response.hasError()) {
            return this.failed(response);
        }

        const siteConfig = await this.siteConfigAsync();
        return siteConfig;
    }

    async updateDataAsync(settings: WorkspaceDataSettings): Data<null> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        const response: ApiResponse = await WorkspaceApi.updateDataSettings(
            landingConfig.workspaceId,
            landingConfig.id,
            settings
        );
        if (response.hasError()) {
            return this.failed(response);
        }

        return null;
    }

    async updateContentAsync(settings: WorkspaceContentSettings): Data<ContentConfig> {
        const landingConfig = await this.landingConfigAsync();
        if (landingConfig instanceof DataFailed) {
            return landingConfig;
        }

        const response: ApiResponse = await WorkspaceApi.updateContentSettings(
            landingConfig.workspaceId,
            landingConfig.id,
            settings
        );
        if (response.hasError()) {
            return this.failed(response);
        }

        const contentConfig = await this.contentConfigAsync();
        return contentConfig;
    }

    private async landingConfigAsync(): Data<LandingConfig> {
        if (this._landingConfig) {
            return this._landingConfig;
        }

        const response: ApiResponse<LandingConfig> = await WorkspaceApi.getLandingConfig();
        if (response.hasError()) {
            if (response.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(response);
        }

        this._landingConfig = response.data;
        if (!this._landingConfig) {
            return new DataFailed({
                actionProcessing: new ActionProcessing("redirect"),
            });
        }

        setTimeout(() => {
            this._landingConfig = null;
        }, WorkspaceDataService.STORAGE_MILLISECONDS);
        return this._landingConfig;
    }
}
