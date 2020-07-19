import {
    INewWorkspaceDto,
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import { ILandingConfigDto, IUserWorkspaceDto, IWorkspaceAddressDto } from "@api/models/workspace/responses";
import { ICreatedWorkspaceDto } from "@api/models/workspace/responses/ICreatedWorkspaceDto";
import {
    LandingConfig,
    UserWorkspace,
    WorkspaceContentSettings,
    WorkspaceDataSettings,
    WorkspaceSiteSettings
} from "@app/models";
import { CreatedWorkspace } from "@models/wokrspaces/CreatedWorkspace";
import { ApiBase, ApiResponse, FileHelper, Mapper, urlWithIds } from "@utils";

import { mockApi } from "./mock/workspace";

export class WorkspaceApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async getWorkspaces(): Promise<ApiResponse<UserWorkspace[]>> {
        const response: ApiResponse = await super.get(process.env.API_GET_WORKSPACES);
        if (response.data) {
            response.data = response.data.map((dto: IUserWorkspaceDto) => Mapper.map<UserWorkspace>(
                nameof<IUserWorkspaceDto>(),
                nameof<UserWorkspace>(),
                dto
            ));
        }
        return response;
    }

    static async create(settings: WorkspaceSiteSettings): Promise<ApiResponse<CreatedWorkspace>> {
        const dto = Mapper.map<INewWorkspaceDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<INewWorkspaceDto>(),
            settings
        );
        const response: ApiResponse = await this.post(process.env.API_CREATE_WORKSPACE, dto);

        const { name, domainName } = response.data as ICreatedWorkspaceDto;
        const workspace = new CreatedWorkspace();
        workspace.domain = domainName;
        workspace.name = name;

        response.data = workspace;
        return response;
    }

    static async getLandingConfig(): Promise<ApiResponse<LandingConfig>> {
        const response: ApiResponse = await this.get(process.env.API_GET_LANDING_CONFIG);
        if (response.data) {
            const dtoConfig: ILandingConfigDto = response.data;
            response.data = Mapper.map<LandingConfig>(
                nameof<ILandingConfigDto>(),
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
        const dto = Mapper.map<IWorkspaceSiteSettingsDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<IWorkspaceSiteSettingsDto>(),
            settings
        );

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
            { workspaceId, landingConfigId }
        );
        if (settings.openGraphImage) {
            const base64 = await FileHelper.toBase64(settings.openGraphImage);
            dto.opengraphImageUrl = FileHelper.clearBase64(base64);
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
            dto.firstPhotoUrl = FileHelper.clearBase64(base64);
        }

        const response: ApiResponse<IWorkspaceAddressDto> = await this.patch(url, dto);
        return response;
    }
}
