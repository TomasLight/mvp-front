import { IWorkspaceContentSettingsDto } from "./IWorkspaceContentSettingsDto";
import { IWorkspaceSiteSettingsDto } from "./IWorkspaceSiteSettingsDto";

export interface IWorkspaceSettingsDto {
    domain: string;
    menuId?: string;

    siteConfig: IWorkspaceSiteSettingsDto;
    iikoConfig?: any;
    contentConfig?: IWorkspaceContentSettingsDto;
}
