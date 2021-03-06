import { FieldOptionVariant, IFieldOption, SelectFieldOption } from "@select/types";

export class FieldOptionsFactory {
    static make(type: FieldOptionVariant): IFieldOption<any, any> {
        switch (type) {
            case FieldOptionVariant.SelectFieldOption:
                return new SelectFieldOption();

            default:
                throw new Error(`Invalid field option type (, ${nameof(type)}`);
        }
    }
}
