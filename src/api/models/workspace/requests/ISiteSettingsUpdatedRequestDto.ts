export interface ISiteSettingsUpdatedRequestDto {
    name: string;
    faviconUrl: string;
    opengraphImage?: string;
    opengraphImageExtension?: string;
    opengraphImageTitle: string;
    color: string;
}
