import {
    INewWorkspaceDto,
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import {
    ILandingConfigDto,
    IUserWorkspaceDto,
    ICreatedWorkspaceDto,
} from "@api/models/workspace/responses";
import { ApiBase, ApiResponse, urlWithIds } from "@utils/api";

import { mockApi } from "./mock/workspace";

export class WorkspaceApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static getWorkspacesAsync(): Promise<ApiResponse<IUserWorkspaceDto[]>> {
        return this.get(process.env.API_GET_WORKSPACES);
    }

    static getLandingConfigAsync(): Promise<ApiResponse<ILandingConfigDto>> {
        return this.get(process.env.API_GET_LANDING_CONFIG);
    }

    static async createAsync(dto: INewWorkspaceDto): Promise<ApiResponse<ICreatedWorkspaceDto>> {
        return this.post(process.env.API_CREATE_WORKSPACE, dto);
    }

    static updateSiteSettingsAsync(
        workspaceId: string,
        landingConfigId: string,
        dto: IWorkspaceSiteSettingsDto
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
        dto: IWorkspaceDataSettingsDto
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
        dto: IWorkspaceContentSettingsDto
    ): Promise<ApiResponse> {

        const url = urlWithIds(
            process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS,
            { workspaceId, landingConfigId }
        );
        return this.patch(url, dto);
    }
}
