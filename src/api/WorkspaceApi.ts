import { IWorkspaceContentSettingsDto, IWorkspaceSettingsDto } from "@api/models/workspace/requests";
import { IUserWorkspaceDto, IWorkspaceAddressDto } from "@api/models/workspace/responses";
import { UserWorkspace, WorkspaceContentSettings, WorkspaceSiteSettings } from "@app/models";
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
        const dto = Mapper.map<IWorkspaceSettingsDto>(
            nameof<WorkspaceSiteSettings>(),
            nameof<IWorkspaceSettingsDto>(),
            settings
        );
        // const formData = Mapper.map<FormData>(
        //     nameof<IWorkspaceSettingsDto>(),
        //     nameof<FormData>(),
        //     settings
        // );
        dto.siteConfig.opengraphImage = await FileHelper.toBase64(settings.openGraphImage);
        const response: ApiResponse<string> = await this.post(process.env.API_POST_WORKSPACE_SETTINGS, dto);
        // const response: ApiResponse<string> = await this.post(process.env.API_POST_WORKSPACE_SETTINGS, formData);
        return response;
    }

    // static async updateSiteSettings(settings: WorkspaceSiteSettings): Promise<ApiResponse> {
    //     const dto = Mapper.map<IWorkspaceSettingsDto>(
    //         nameof<WorkspaceSiteSettings>(),
    //         nameof<IWorkspaceSettingsDto>(),
    //         settings
    //     );
    //
    //     const url = urlWithIds(process.env.API_PATCH_WORKSPACE_SITE_SETTINGS, { landingConfigId });
    //     const response: ApiResponse = await this.patch(process.env.API_PATCH_WORKSPACE_SITE_SETTINGS, dto);
    //     return response;
    // }

    static async updateContentSettings(
        landingConfigId: string,
        settings: WorkspaceContentSettings
    ): Promise<ApiResponse> {

        const dto = Mapper.map<IWorkspaceContentSettingsDto>(
            nameof<WorkspaceContentSettings>(),
            nameof<IWorkspaceContentSettingsDto>(),
            settings
        );

        const url = urlWithIds(process.env.API_PATCH_WORKSPACE_CONTENT_SETTINGS, { landingConfigId });
        dto.firstPhoto = await FileHelper.toBase64(settings.photo);

        const response: ApiResponse<IWorkspaceAddressDto> = await this.patch(url, dto);
        return response;
    }
}
