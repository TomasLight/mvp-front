import { IFieldOption } from "./IFieldOption";

export function isFieldOption (option: any): option is IFieldOption {
    if (typeof option !== "object" || option == null) {
        return false;
    }
    return nameof<IFieldOption>((o) => o.isNullOrEmptySingle) in option;
}
