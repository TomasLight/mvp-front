import { IconVariant } from "@enums";
import { ISetupFormValues } from "@main/Setup/models";

export class SetupStore {
    initialValues: ISetupFormValues;

    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;

    userName: string;
    openGraphImage: string;
    openGraphTitle: string;

    color: string;

    constructor() {
        this.initialValues = {} as any;

        this.faviconVariant = IconVariant.NA;
        this.siteName = "";
        this.siteUrl = "";

        this.userName = "Имя и Фамилия";
        this.openGraphImage = "";
        this.openGraphTitle = "";

        this.color = "";
    }
}
