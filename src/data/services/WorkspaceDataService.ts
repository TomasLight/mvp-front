import {
    INewWorkspaceRequestDto,
    IContentSettingsRequestDto,
    IDataSettingsUpdatedRequestDto,
    ISiteSettingsUpdatedRequestDto
} from "@api/models/workspace/requests";
import { ILandingConfigDto, IUserWorkspaceResponseDto } from "@api/models/workspace/responses";
import { WorkspaceApi } from "@api/WorkspaceApi";
import {
    ContentConfig,
    LandingConfig,
    SiteConfig,
    UserWorkspace, WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { ApiResponseStatus, FileHelper, Mapper } from "@utils";
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
        this.updateDataAsync = this.updateDataAsync.bind(this);
        this.updateContentAsync = this.updateContentAsync.bind(this);
        this.landingConfigAsync = this.landingConfigAsync.bind(this);
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
        const workspacesResponse = await WorkspaceApi.getWorkspacesAsync();
        if (workspacesResponse.hasError()) {
            if (workspacesResponse.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(workspacesResponse);
        }

        this._workspaces = workspacesResponse.data.map((dto: IUserWorkspaceResponseDto) => Mapper.map<UserWorkspace>(
            nameof<IUserWorkspaceResponseDto>(),
            nameof<UserWorkspace>(),
            dto
        ));

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

        const workspace = workspaces.find(ws => ws.domain === domain);
        return workspace;
    }

    async createAsync(settings: WorkspaceSiteSettings): Data<UserWorkspace> {
        const dto = Mapper.map<INewWorkspaceRequestDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<INewWorkspaceRequestDto>(),
            settings
        );

        const createdWorkspaceResponse = await WorkspaceApi.createAsync(dto);
        if (createdWorkspaceResponse.hasError()) {
            return this.failed(createdWorkspaceResponse);
        }

        const { name, domainName } = createdWorkspaceResponse.data;

        const workspace = await this.getByDomainAsync(domainName);
        if (workspace instanceof DataFailed) {
            return workspace;
        }

        this._workspaces.push({
            domain: domainName,
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

        const dto = Mapper.map<ISiteSettingsUpdatedRequestDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<ISiteSettingsUpdatedRequestDto>(),
            settings
        );
        if (settings.openGraphImage) {
            const base64 = await FileHelper.toBase64(settings.openGraphImage);
            dto.opengraphImage = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse = await WorkspaceApi.updateSiteSettingsAsync(
            landingConfig.workspaceId,
            landingConfig.id,
            dto
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

        const dto: IDataSettingsUpdatedRequestDto = {
            archive: "",
        };
        if (settings.archive) {
            const base64 = await FileHelper.toBase64(settings.archive);
            dto.archive = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse = await WorkspaceApi.updateDataSettingsAsync(
            landingConfig.workspaceId,
            landingConfig.id,
            dto
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

        const dto = Mapper.map<IContentSettingsRequestDto>(
            nameof<WorkspaceContentSettings>(),
            nameof<IContentSettingsRequestDto>(),
            settings
        );
        if (settings.photo) {
            const base64 = await FileHelper.toBase64(settings.photo);
            dto.firstPhoto = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse = await WorkspaceApi.updateContentSettingsAsync(
            landingConfig.workspaceId,
            landingConfig.id,
            dto
        );
        if (response.hasError()) {
            return this.failed(response);
        }

        const contentConfig = await this.contentConfigAsync();
        return contentConfig;
    }

    async landingConfigAsync(): Data<LandingConfig> {
        if (this._landingConfig) {
            return this._landingConfig;
        }

        const response = await WorkspaceApi.getLandingConfigAsync();
        if (response.hasError()) {
            if (response.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(response);
        }

        if (!response.data) {
            return new DataFailed({
                actionProcessing: new ActionProcessing("redirect"),
            });
        }

        this._landingConfig = Mapper.map<LandingConfig>(
            nameof<ILandingConfigDto>(),
            nameof<LandingConfig>(),
            response.data
        );

        setTimeout(() => {
            this._landingConfig = null;
        }, WorkspaceDataService.STORAGE_MILLISECONDS);
        return this._landingConfig;
    }
}
