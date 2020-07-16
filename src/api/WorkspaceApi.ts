import {
    INewWorkspaceDto,
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSettingsDto
} from "@api/models/workspace/requests";
import { ILandingConfig, IUserWorkspaceDto, IWorkspaceAddressDto } from "@api/models/workspace/responses";
import {
    LandingConfig,
    UserWorkspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@app/models";
import { ApiBase, ApiResponse, FileHelper, Mapper, urlWithIds } from "@utils";

import { mockApi } from "./mock/workspace";

export class WorkspaceApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async get(): Promise<ApiResponse> {
        const response: ApiResponse<IUserWorkspaceDto[]> = await super.get(process.env.API_GET_WORKSPACES);
        if (response.data) {
            response.data = response.data.map((dto: IUserWorkspaceDto) => Mapper.map<UserWorkspace>(
                nameof<IUserWorkspaceDto>(),
                nameof<UserWorkspace>(),
                dto
            ));
        }
        return response;
    }

    static async create(settings: WorkspaceSiteSettings): Promise<ApiResponse<string>> {
        const dto = Mapper.map<INewWorkspaceDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<INewWorkspaceDto>(),
            settings
        );
        const response: ApiResponse<string> = await this.post(process.env.API_CREATE_WORKSPACE, dto);
        return response;
    }

    static async getLandingConfig(): Promise<ApiResponse<LandingConfig>> {
        const response: ApiResponse = await super.get(process.env.API_GET_LANDING_CONFIG);
        if (response.data) {
            const dtoConfig: ILandingConfig = response.data;
            response.data = Mapper.map<LandingConfig>(
                nameof<ILandingConfig>(),
                nameof<LandingConfig>(),
                dtoConfig
            );
        }

        return response;
    }

    static async updateSiteSettings(
        workspaceId: string,
        landingConfigId: string,
        settings: WorkspaceSiteSettings
    ): Promise<ApiResponse> {
        const dto = Mapper.map<IWorkspaceSettingsDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<IWorkspaceSettingsDto>(),
            settings
        );

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
            { workspaceId, landingConfigId }
        );
        if (settings.openGraphImage) {
            const base64 = await FileHelper.toBase64(settings.openGraphImage);
            dto.siteConfig.opengraphImageUrl = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse = await this.patch(url, dto);
        return response;
    }

    static async updateDataSettings(
        workspaceId: string,
        landingConfigId: string,
        settings: WorkspaceDataSettings
    ): Promise<ApiResponse> {

        // @ts-ignore
        const dto: IWorkspaceDataSettingsDto = {};
        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_DATA_SETTINGS,
            { workspaceId, landingConfigId }
        );

        if (settings.archive) {
            const base64 = await FileHelper.toBase64(settings.archive);
            dto.archive = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse = await this.patch(url, dto);
        return response;
    }

    static async updateContentSettings(
        workspaceId: string,
        landingConfigId: string,
        settings: WorkspaceContentSettings
    ): Promise<ApiResponse> {

        const dto = Mapper.map<IWorkspaceContentSettingsDto>(
            nameof<WorkspaceContentSettings>(),
            nameof<IWorkspaceContentSettingsDto>(),
            settings
        );

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS,
            { workspaceId, landingConfigId }
        );
        if (settings.photo) {
            const base64 = await FileHelper.toBase64(settings.photo);
            dto.firstPhoto = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse<IWorkspaceAddressDto> = await this.patch(url, dto);
        return response;
    }
}
