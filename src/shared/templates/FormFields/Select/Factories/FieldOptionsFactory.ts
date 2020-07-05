import { FieldOptionEnum, IFieldOption, SelectFieldOption } from "@shared/molecules/SelectComponents/types";

export class FieldOptionsFactory {
    public static make(type: FieldOptionEnum): IFieldOption<any, any> {
        switch (type) {
            case FieldOptionEnum.SelectFieldOption:
                return new SelectFieldOption();

            default:
                throw new Error(`Invalid field option type (, ${nameof(type)}`);
        }
    }
}
