import { SelectFieldOption } from "./SelectFieldOption";

export class ColorSelectFieldOption extends SelectFieldOption<string> {
    public color: string;

    constructor(option?: { id: any; color: string, searchTags?: string[] }) {
        super({
            id: option.id,
            title: "",
            searchTags: option.searchTags,
        });
        this.color = option.color;
    }

    emptySingleValue(): number {
        return 0;
    }

    emptyOption = (): ColorSelectFieldOption => {
        return new ColorSelectFieldOption();
    };

    isEquals(value: string): boolean {
        return this.color === value;
    }

    getValue(): string {
        return this.color;
    }

    static create(): ColorSelectFieldOption {
        return new ColorSelectFieldOption();
    }
}
