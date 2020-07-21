import { IWorkspaceSiteSettingsDto } from "./IWorkspaceSiteSettingsDto";
import { IWorkspaceDataSettingsDto } from "./IWorkspaceDataSettingsDto";
import { IWorkspaceContentSettingsDto } from "./IWorkspaceContentSettingsDto";

export interface ILandingConfigDto {
    id: string;
    workspaceId: string;
    menuId: string;

    siteConfig: IWorkspaceSiteSettingsDto;
    iikoConfig?: IWorkspaceDataSettingsDto;
    contentConfig?: IWorkspaceContentSettingsDto;
}
