import { IDataSettingsUpdatedRequestDto } from "@api/models/workspace/requests/IDataSettingsUpdatedRequestDto";
import { IContentSettingsRequestDto } from "./IContentSettingsRequestDto";
import { ISiteSettingsUpdatedRequestDto } from "./ISiteSettingsUpdatedRequestDto";

export interface IWorkspaceSettingsRequestDto {
    domain: string;
    menuId?: string;

    siteConfig: ISiteSettingsUpdatedRequestDto;
    iikoConfig?: IDataSettingsUpdatedRequestDto;
    contentConfig?: IContentSettingsRequestDto;
}
