import {
    IContentSettingsRequestDto,
    IDataSettingsUpdatedRequestDto,
    INewLandingConfigRequestDto,
    ISiteSettingsUpdatedRequestDto
} from "@api/models/workspace/requests";
import {
    ILandingConfigDto,
    INewLandingConfigResponseDto,
    IUserWorkspaceResponseDto
} from "@api/models/workspace/responses";
import { WorkspaceApi } from "@api/WorkspaceApi";
import {
    ContentConfig,
    LandingConfig,
    SiteConfig,
    Workspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@models";
import { FileHelper, Mapper } from "@utils";
import { ApiResponse, ApiResponseStatus } from "@utils/api";
import { ActionProcessing } from "@utils/data/ActionProcessing";
import { Data } from "@utils/data/Data";
import { DataFailed } from "@utils/data/DataFailed";
import { IWorkspaceDataService } from "../IWorkspaceDataService";
import { DataServiceBase } from "./DataServiceBase";

export class WorkspaceDataService extends DataServiceBase implements IWorkspaceDataService {
    private static readonly STORAGE_TIME_MILLISECONDS = 5000;
    private static readonly NEW_LANDING_CONFIG_STORAGE_TIME_MILLISECONDS = 10000;

    constructor() {
        super();
        this.siteConfigAsync = this.siteConfigAsync.bind(this);
        this.contentConfigAsync = this.contentConfigAsync.bind(this);
        this.currentWorkspaceAsync = this.currentWorkspaceAsync.bind(this);
        this.hasWorkspaceAsync = this.hasWorkspaceAsync.bind(this);
        this.createConfigAsync = this.createConfigAsync.bind(this);
        this.updateSiteAsync = this.updateSiteAsync.bind(this);
        this.updateDataAsync = this.updateDataAsync.bind(this);
        this.updateContentAsync = this.updateContentAsync.bind(this);

        this._workspaces = [];
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

    async listAsync(): Data<Workspace[]> {
        if (this._workspaces.length) {
            return this._workspaces;
        }

        const workspacesResponse = await WorkspaceApi.getWorkspacesAsync();
        if (workspacesResponse.hasError()) {
            if (workspacesResponse.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(workspacesResponse);
        }

        this._workspaces = workspacesResponse.data.map((dto: IUserWorkspaceResponseDto) => Mapper.map<Workspace>(
            nameof<IUserWorkspaceResponseDto>(),
            nameof<Workspace>(),
            dto
        ));

        setTimeout(() => {
            this._workspaces = [];
        }, WorkspaceDataService.STORAGE_TIME_MILLISECONDS);
        return this._workspaces;
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
        const dto = Mapper.map<INewLandingConfigRequestDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<INewLandingConfigRequestDto>(),
            settings
        );

        const base64 = await FileHelper.toBase64(settings.openGraphImage);
        dto.siteConfig.opengraphImage = FileHelper.clearBase64(base64);

        const landingConfigResponse = await WorkspaceApi.createConfigAsync(dto);
        if (landingConfigResponse.hasError()) {
            return this.failed(landingConfigResponse);
        }

        const { workspaceId, siteConfig } = landingConfigResponse.data;
        const workspace: Workspace = new Workspace({
            domain: dto.domainName,
            id: workspaceId,
            name: siteConfig.name,
            role: "owner",
        });
        this._workspaces.push(workspace);

        this._landingConfig = Mapper.map<LandingConfig>(
            nameof<INewLandingConfigResponseDto>(),
            nameof<LandingConfig>(),
            landingConfigResponse.data
        );

        setTimeout(() => {
            this._landingConfig = null;
        }, WorkspaceDataService.NEW_LANDING_CONFIG_STORAGE_TIME_MILLISECONDS);

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

        let workspaceId: string;
        if (this._workspaces.length > 0) {
            workspaceId = this._workspaces[0].id;
        }
        else {
            const workspaceIdData = await this.getWorkspaceIdAsync();
            if (workspaceIdData instanceof DataFailed) {
                return workspaceIdData;
            }
            workspaceId = workspaceIdData;
        }

        const response = await WorkspaceApi.getLandingConfigByWorkspaceIdAsync(workspaceId);
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
                actionProcessing: new ActionProcessing("create"),
            });
        }

        this._landingConfig = Mapper.map<LandingConfig>(
            nameof<ILandingConfigDto>(),
            nameof<LandingConfig>(),
            response.data
        );

        setTimeout(() => {
            this._landingConfig = null;
        }, WorkspaceDataService.STORAGE_TIME_MILLISECONDS);

        return this._landingConfig;
    }

    private async getWorkspaceIdAsync() {
        const workspaceResponse = await WorkspaceApi.getWorkspacesAsync();
        if (workspaceResponse.hasError() || !workspaceResponse.data.length) {
            if (workspaceResponse.statusCode === ApiResponseStatus.Forbidden) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("create"),
                });
            }

            return this.failed(workspaceResponse);
        }
        return workspaceResponse.data[0].id;
    }
}
