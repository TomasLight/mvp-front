import { ModelState, IValidator, Errors } from "model-state-validation";

import { BaseValidator, Translate } from "@utils";
import { IContactSettingsFormValues } from "../models";

export class ContactSettingsValidator
    extends BaseValidator
    implements IValidator<IContactSettingsFormValues> {

    static validate(model: IContactSettingsFormValues): Errors {
        const validator = new ContactSettingsValidator();
        return validator.validate(model).getErrors();
    }

    validate(model: IContactSettingsFormValues): ModelState {
        const modelState = new ModelState();

        if (!this.firstBlockTextIsValid(model.firstBlockText)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.firstBlockText),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.phoneIsValid(model.phone)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.phone),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.addressIsValid(model.address)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.address),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.deliveryTimeIsValid(model.deliveryTime)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.deliveryTime),
                Translate.getString("Обязательное поле.")
            );
        }

        if (!this.deliveryLocationLinkIsValid(model.deliveryLocationLink)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.deliveryLocationLink),
                Translate.getString("Обязательное поле.")
            );
        }

        if (model.photo && !this.photoSizeIsValid(model.photo)) {
            modelState.addError(
                nameof<IContactSettingsFormValues>((o) => o.photo),
                Translate.getString("Изображение весит больше 1 MB")
            );
        }

        return modelState;
    }

    firstBlockTextIsValid(siteName: any): boolean {
        return typeof siteName === "string" && siteName.length > 0;
    }

    phoneIsValid(phone: any): boolean {
        return typeof phone === "string" && phone.length > 0;
    }

    addressIsValid(address: any): boolean {
        return typeof address === "string" && address.length > 0;
    }

    deliveryTimeIsValid(deliveryTime: any): boolean {
        return typeof deliveryTime === "string" && deliveryTime.length > 0;
    }

    deliveryLocationLinkIsValid(deliveryLocationLink: any): boolean {
        return !deliveryLocationLink
            || typeof deliveryLocationLink === "string" && deliveryLocationLink.length > 0;
    }

    photoSizeIsValid(files: FileList): boolean {
        return true;
    }
}
