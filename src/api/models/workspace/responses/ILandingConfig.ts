import { IWorkspaceContentSettingsDto } from "@api/models/workspace/requests/IWorkspaceContentSettingsDto";
import { IWorkspaceDataSettingsDto } from "@api/models/workspace/requests/IWorkspaceDataSettingsDto";
import { IWorkspaceSiteSettingsDto } from "@api/models/workspace/requests/IWorkspaceSiteSettingsDto";

export interface ILandingConfig {
    id: string;
    workspaceId: string;
    menuId: string;

    siteConfig: IWorkspaceSiteSettingsDto;
    iikoConfig?: IWorkspaceDataSettingsDto;
    contentConfig?: IWorkspaceContentSettingsDto;
}
