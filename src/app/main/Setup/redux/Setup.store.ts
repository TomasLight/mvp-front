import { IconVariant } from "@enums";
import { ISetupFormValues, setupSteps } from "@main/Setup/models";
import { ColorSelectFieldOption, IconSelectFieldOption } from "@select";
import { brandColors } from "@shared/theme";

export class SetupStore {
    setupStep: number;

    initialValues: ISetupFormValues;
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
        this.setupStep = setupSteps.siteSettings;

        const initialColor = brandColors.get(8).color;

        this.initialValues = {
            primaryColor: initialColor,
        } as any;

        this.faviconOptions = [
            this.addIcon(IconVariant.Coffee),
            this.addIcon(IconVariant.PepperHot),
            this.addIcon(IconVariant.PizzaSlice),
        ];

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

    private addIcon(id: IconVariant) {
        return new IconSelectFieldOption({ id, title: "" });
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
