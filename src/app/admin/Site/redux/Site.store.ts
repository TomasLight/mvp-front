import { IconVariant } from "@enums";
import { ISiteSettingsFormValues } from "@admin/Site/models";
import { ColorSelectFieldOption, IconSelectFieldOption } from "@select";
import { faviconTags, FavIconVariant } from "@shared/molecules";
import { brandColors } from "@shared/theme";

export class SiteStore {
    workspacesAreLoading: boolean;

    initialValues: ISiteSettingsFormValues;
    faviconOptions: IconSelectFieldOption[];
    colorOptions: ColorSelectFieldOption[];

    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;
    userName: string;
    openGraphImage: string;
    openGraphTitle: string;
    color: string;

    settingsAreSending: boolean;

    constructor() {
        this.workspacesAreLoading = false;

        const initialColor = brandColors.get(8).color;
        this.initialValues = {
            primaryColor: initialColor,
        } as any;

        this.faviconOptions = this.makeFaviconOptions();
        this.colorOptions = this.makeColorOptions();

        this.faviconVariant = IconVariant.NA;
        this.siteName = "";
        this.siteUrl = "";

        this.userName = "Имя и Фамилия";
        this.openGraphImage = "";
        this.openGraphTitle = "";

        this.color = initialColor;

        this.settingsAreSending = false;
    }

    private makeFaviconOptions() {
        const keys = Object.keys(FavIconVariant);
        const faviconOptions: IconSelectFieldOption[] = keys.map(key => {
            const favicon = FavIconVariant[key];
            const searchTags = faviconTags.get(favicon);
            return new IconSelectFieldOption({
                id: favicon,
                title: "",
                searchTags,
            });
        });

        return faviconOptions;
    }

    private makeColorOptions() {
        const colorOptions: ColorSelectFieldOption[] = [];

        brandColors.forEach((brandColor, id) => {
            colorOptions.push(new ColorSelectFieldOption({
                id: `color-${id}`,
                color: brandColor.color,
                searchTags: brandColor.searchTags,
            }));
        });

        return colorOptions;
    }
}
