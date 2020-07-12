import { SelectFieldOption } from "./SelectFieldOption";

export class IconSelectFieldOption extends SelectFieldOption<number> {
    emptySingleValue(): number {
        return 0;
    }

    emptyOption = (): IconSelectFieldOption => {
        return new IconSelectFieldOption();
    };

    static create(): IconSelectFieldOption {
        return new IconSelectFieldOption();
    }
}
