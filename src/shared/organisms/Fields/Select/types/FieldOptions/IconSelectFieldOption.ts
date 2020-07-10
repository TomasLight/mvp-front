import { SelectFieldOption } from "./SelectFieldOption";

export class IconSelectFieldOption extends SelectFieldOption<number> {
    constructor(option?: { id: any; title: any }) {
        super(option);
    }

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
