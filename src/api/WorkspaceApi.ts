import { IWorkspaceSettingsDto } from "@api/models/workspace/requests";
import { WorkspaceSettings } from "@main/Setup/models/WorkspaceSettings";
import { ApiBase, ApiResponse, Mapper } from "@utils";

import { mockApi } from "./mock/workspace";

export class WorkspaceApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async sendSettings(settings: WorkspaceSettings): Promise<ApiResponse> {
        const dto = Mapper.map<IWorkspaceSettingsDto>(
            nameof<WorkspaceSettings>(),
            nameof<IWorkspaceSettingsDto>(),
            settings
        );

        const response: ApiResponse = await this.post(process.env.API_POST_WORKSPACE_SETTINGS, dto);
        return response;
    }
}
