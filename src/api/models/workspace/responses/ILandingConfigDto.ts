import { ISiteSettingsResponseDto } from "./ISiteSettingsResponseDto";
import { IContentSettingsResponseDto } from "./IContentSettingsResponseDto";

export interface ILandingConfigDto {
    id: string;
    workspaceId: string;
    menuId: string;

    siteConfig: ISiteSettingsResponseDto;
    iikoConfig?: {};
    contentConfig?: IContentSettingsResponseDto;
}
