import { IWorkspaceContentSettingsDto, IWorkspaceSiteSettingsDto } from "@api/models/workspace/requests";
import { IWorkspaceAddressDto } from "@api/models/workspace/responses";
import { WorkspaceContentSettings } from "@main/Content/models";
import { WorkspaceSiteSettings } from "@main/Setup/models";
import { ApiBase, ApiResponse, Mapper } from "@utils";

import { mockApi } from "./mock/workspace";

export class WorkspaceApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async sendSiteSettings(settings: WorkspaceSiteSettings): Promise<ApiResponse> {
        const dto = Mapper.map<IWorkspaceSiteSettingsDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<IWorkspaceSiteSettingsDto>(),
            settings
        );

        const response: ApiResponse = await this.post(process.env.API_POST_WORKSPACE_SITE_SETTINGS, dto);
        return response;
    }

    static async sendContentSettings(settings: WorkspaceContentSettings): Promise<ApiResponse> {
        const dto = Mapper.map<IWorkspaceContentSettingsDto>(
            nameof<WorkspaceContentSettings>(),
            nameof<IWorkspaceContentSettingsDto>(),
            settings
        );

        const response: ApiResponse<IWorkspaceAddressDto> =
            await this.post(process.env.API_POST_WORKSPACE_CONTENT_SETTINGS, dto);
        return response;
    }
}
