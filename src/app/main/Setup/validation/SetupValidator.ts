import { ISetupFormValues } from "@main/Setup/models";
import { ModelState, IValidatorAsync, Errors } from "model-state-validation";

import { BaseValidator, Translate } from "@utils";

export class SetupValidator extends BaseValidator implements IValidatorAsync<ISetupFormValues> {

    static async validate(model: ISetupFormValues): Promise<Errors> {
        const validator = new SetupValidator();
        const validationResult = await validator.validateAsync(model);
        return validationResult.getErrors();
    }

    private imageSizes = {
        height: 504,
        width: 968,
    };

    async validateAsync(model: ISetupFormValues): Promise<ModelState> {
        const modelState = new ModelState();

        if (!this.siteNameIsValid(model.siteName)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.siteName),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.domainIsValid(model.domain)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.domain),
                Translate.getString("Некорректный домен.")
            );
        }

        if (!this.faviconIsValid(model.favicon)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.favicon),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.openGraphImageIsValid(model.openGraphImage)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.openGraphImage),
                Translate.getString("Обязательное поле.")
            );
        }
        else if (!this.openGraphImageSizeIsValid(model.openGraphImage)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.openGraphImage),
                Translate.getString("Изображение весит больше 1 MB")
            );
        }
        else if (! await this.openGraphImageResolutionIsValid(model.openGraphImage)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.openGraphImage),
                Translate.getString(`Размер изображения слишком большой. Высота должна быть не больше ${this.imageSizes.height}px, а ширина не больше ${this.imageSizes.width}.`)
            );
        }
        // else {
        //     this.openGraphImageResolutionIsValid(model.openGraphImage).then((result) => {
        //         if (!result) {
        //             modelState.addError(
        //                 nameof<ISetupFormValues>((o) => o.openGraphImage),
        //                 Translate.getString(`Размер изображения слишком большой. Высота должна быть не больше ${this.imageSizes.height}px, а ширина не больше ${this.imageSizes.width}.`)
        //             );
        //         }
        //     });
        // }

        if (!this.openGraphTitleIsValid(model.openGraphTitle)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.openGraphTitle),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.primaryColorIsValid(model.primaryColor)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.primaryColor),
                Translate.getString("Обязательное поле.")
            );
        }

        return modelState;
    }

    siteNameIsValid(siteName: any): boolean {
        return typeof siteName === "string" && siteName.length > 0;
    }

    domainIsValid(domain: any): boolean {
        return typeof domain === "string" && domain.length > 0;
    }

    faviconIsValid(favicon: any): boolean {
        return typeof favicon === "string" && favicon.length > 0;
    }

    openGraphImageIsValid(openGraphImage: any): boolean {
        return !!openGraphImage;
    }

    openGraphImageSizeIsValid(files: FileList): boolean {
        if (!(files instanceof FileList)) {
            return false;
        }

        // kb * byte * bit
        const MB = 1024 * 1024 * 8;
        return files[0].size <= MB;
    }

    async openGraphImageResolutionIsValid(files: FileList): Promise<boolean> {
        if (!(files instanceof FileList)) {
            return false;
        }

        const obj = { flag: true };
        const image = new Image();

        const fileReader = new FileReader();
        fileReader.onload = () => {
            image.onload = () => {
                obj.flag = false;
            };

            image.src = fileReader.result as string;
        };

        fileReader.readAsDataURL(files[0]);

        const sizes = await this.loopImageResolution(image, obj);

        return sizes.height <= this.imageSizes.height
            && sizes.width <= this.imageSizes.width;
    }

    private count = 0;

    async loopImageResolution(image: HTMLImageElement, obj: { flag: boolean }) {
        console.log(this.count++);
        const waitPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });

        await waitPromise;

        if (obj.flag) {
            return await this.loopImageResolution(image, obj);
        }

        return {
            height: image.height,
            width: image.width,
        };
    }

    openGraphTitleIsValid(openGraphTitle: any): boolean {
        return typeof openGraphTitle === "string" && openGraphTitle.length > 0;
    }

    primaryColorIsValid(primaryColor: any): boolean {
        return typeof primaryColor === "string" && primaryColor.length > 0;
    }
}
