import { IconVariant } from "@enums";
import { colorsDictionary, ISetupFormValues } from "@main/Setup/models";

export class SetupStore {
    initialValues: ISetupFormValues;

    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;

    userName: string;
    openGraphImage: string;
    openGraphTitle: string;

    color: string;

    settingsAreSending: boolean;

    constructor() {
        const initialColor = colorsDictionary["1"];

        this.initialValues = {
            primaryColor: initialColor,
        } as any;

        this.faviconVariant = IconVariant.NA;
        this.siteName = "";
        this.siteUrl = "";

        this.userName = "Имя и Фамилия";
        this.openGraphImage = "";
        this.openGraphTitle = "";

        this.color = initialColor;

        this.settingsAreSending = false;
    }
}
