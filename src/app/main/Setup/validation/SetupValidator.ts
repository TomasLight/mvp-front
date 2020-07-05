import { ISetupFormValues } from "@main/Setup/models";
import { ModelState, IValidator, Errors } from "model-state-validation";

import { BaseValidator, Translate } from "@utils";

export class SetupValidator extends BaseValidator implements IValidator<ISetupFormValues> {

    public static validate(model: ISetupFormValues): Errors {
        const validator = new SetupValidator();
        return validator.validate(model).getErrors();
    }

    public validate(model: ISetupFormValues): ModelState {
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
                nameof<ISetupFormValues>((o) => o.favicon),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.openGraphTitleIsValid(model.openGraphTitle)) {
            modelState.addError(
                nameof<ISetupFormValues>((o) => o.openGraphTitle),
                Translate.getString("Обязательное поле.")
            );
        }

        return modelState;
    }

    public siteNameIsValid(siteName: any): boolean {
        return typeof siteName === "string" && siteName.length > 0;
    }

    public domainIsValid(domain: any): boolean {
        return typeof domain === "string" && domain.length > 0;
    }

    public faviconIsValid(favicon: any): boolean {
        return typeof favicon === "string" && favicon.length > 0;
    }

    public openGraphImageIsValid(openGraphImage: any): boolean {
        return typeof openGraphImage === "string" && openGraphImage.length > 0;
    }

    public openGraphTitleIsValid(openGraphTitle: any): boolean {
        return typeof openGraphTitle === "string" && openGraphTitle.length > 0;
    }
}
