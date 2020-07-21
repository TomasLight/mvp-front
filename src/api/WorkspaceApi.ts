import {
    INewWorkspaceRequestDto,
    IContentSettingsRequestDto,
    IDataSettingsUpdatedRequestDto,
    ISiteSettingsUpdatedRequestDto
} from "@api/models/workspace/requests";
import {
    ILandingConfigDto,
    IUserWorkspaceResponseDto,
    IWorkspaceResponseDto,
} from "@api/models/workspace/responses";
import { ApiBase, ApiResponse, urlWithIds } from "@utils/api";

export class WorkspaceApi extends ApiBase {
    static getWorkspacesAsync(): Promise<ApiResponse<IUserWorkspaceResponseDto[]>> {
        return this.get(process.env.API_GET_WORKSPACES);
    }

    static getLandingConfigAsync(): Promise<ApiResponse<ILandingConfigDto>> {
        return this.get(process.env.API_GET_LANDING_CONFIG);
    }

    static async createAsync(dto: INewWorkspaceRequestDto): Promise<ApiResponse<IWorkspaceResponseDto>> {
        return this.post(process.env.API_CREATE_WORKSPACE, dto);
    }

    static updateSiteSettingsAsync(
        workspaceId: string,
        landingConfigId: string,
        dto: ISiteSettingsUpdatedRequestDto
    ): Promise<ApiResponse> {

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_SITE_SETTINGS,
            { workspaceId, landingConfigId }
        );
        return this.patch(url, dto);
    }

    static async updateDataSettingsAsync(
        workspaceId: string,
        landingConfigId: string,
        dto: IDataSettingsUpdatedRequestDto
    ): Promise<ApiResponse> {

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_DATA_SETTINGS,
            { workspaceId, landingConfigId }
        );
        return this.patch(url, dto);
    }

    static async updateContentSettingsAsync(
        workspaceId: string,
        landingConfigId: string,
        dto: IContentSettingsRequestDto
    ): Promise<ApiResponse> {

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS,
            { workspaceId, landingConfigId }
        );
        return this.patch(url, dto);
    }
}
