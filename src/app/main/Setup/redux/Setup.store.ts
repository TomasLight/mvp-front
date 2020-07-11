import { IconVariant } from "@enums";
import { colorsDictionary, ISetupFormValues, setupSteps } from "@main/Setup/models";
import { ColorSelectFieldOption, IconSelectFieldOption } from "@select";

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

        const initialColor = colorsDictionary["1"];

        this.initialValues = {
            primaryColor: initialColor,
        } as any;

        this.faviconOptions = [
            this.addIcon(IconVariant.Coffee),
            this.addIcon(IconVariant.PepperHot),
            this.addIcon(IconVariant.PizzaSlice),
        ];

        this.colorOptions = [
            this.addColor(1),
            this.addColor(2),
            this.addColor(3),
            this.addColor(4),
            this.addColor(5),
            this.addColor(6),
            this.addColor(7),
            this.addColor(8),
        ];

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

    private addColor(i: number) {
        return new ColorSelectFieldOption({
            id: `color-${i}`,
            color: colorsDictionary[i],
        });
    }
}
