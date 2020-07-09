import { FieldOptionEnum, IFieldOption, SelectFieldOption } from "@select/types";

export class FieldOptionsFactory {
    static make(type: FieldOptionEnum): IFieldOption<any, any> {
        switch (type) {
            case FieldOptionEnum.SelectFieldOption:
                return new SelectFieldOption();

            default:
                throw new Error(`Invalid field option type (, ${nameof(type)}`);
        }
    }
}
