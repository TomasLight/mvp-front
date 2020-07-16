import { IWorkspaceDataSettingsDto } from "@api/models/workspace/requests/IWorkspaceDataSettingsDto";
import { IWorkspaceContentSettingsDto } from "./IWorkspaceContentSettingsDto";
import { IWorkspaceSiteSettingsDto } from "./IWorkspaceSiteSettingsDto";

export interface IWorkspaceSettingsDto {
    domain: string;
    menuId?: string;

    siteConfig: IWorkspaceSiteSettingsDto;
    iikoConfig?: IWorkspaceDataSettingsDto;
    contentConfig?: IWorkspaceContentSettingsDto;
}
