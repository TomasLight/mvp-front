import { IWorkspaceDataSettingsUpdatedDto } from "@api/models/workspace/requests/IWorkspaceDataSettingsUpdatedDto";
import { IWorkspaceContentSettingsDto } from "./IWorkspaceContentSettingsDto";
import { IWorkspaceSiteSettingsUpdatedDto } from "./IWorkspaceSiteSettingsUpdatedDto";

export interface IWorkspaceSettingsDto {
    domain: string;
    menuId?: string;

    siteConfig: IWorkspaceSiteSettingsUpdatedDto;
    iikoConfig?: IWorkspaceDataSettingsUpdatedDto;
    contentConfig?: IWorkspaceContentSettingsDto;
}
