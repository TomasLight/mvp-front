import { SelectFieldOption } from "@shared/molecules/SelectComponents/types/FieldOptions/SelectFieldOption";

export class IconSelectFieldOption extends SelectFieldOption<number> {
    constructor(option?: { id: any; title: any }) {
        super(option);
    }

    public emptySingleValue(): number {
        return 0;
    }

    public emptyOption = (): IconSelectFieldOption => {
        return new IconSelectFieldOption();
    };

    public static create(): IconSelectFieldOption {
        return new IconSelectFieldOption();
    }
}
