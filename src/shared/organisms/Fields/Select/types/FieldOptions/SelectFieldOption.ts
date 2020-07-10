import { IFieldOption } from "../IFieldOption";
import { OptionValueType } from "../OptionValueType";

export class SelectFieldOption<TOptionValue = OptionValueType>
    implements IFieldOption<TOptionValue, TOptionValue> {

    id: TOptionValue;
    title: string;

    constructor(option?: { id: any; title: any }) {
        if (option === undefined) {
            this.id = this.emptySingleValue();
            this.title = "";
        }
        else {
            this.id = option.id;
            this.title = option.title;
        }
    }

    emptySingleValue(): any {
        return "";
    }

    emptyMultiValue(): TOptionValue[] {
        return [];
    }

    emptyOption(): SelectFieldOption<TOptionValue> {
        return new SelectFieldOption({
            id: this.emptySingleValue(),
            title: "",
        });
    }

    isEmptyOption(): boolean {
        return this.id === this.emptySingleValue();
    }

    isEquals(value: TOptionValue): boolean {
        return this.id === value;
    }

    isNullOrEmptySingle(): boolean {
        return this.isNullOrEmptySingleValue(this.id);
    }

    isNullOrEmptySingleValue(value: any): boolean {
        return value === null
            || value === undefined
            || value === this.emptySingleValue();
    }

    isNullOrEmptyMulti(): boolean {
        return this.isNullOrEmptyMultiValue(this.id);
    }

    isNullOrEmptyMultiValue(value: any): boolean {
        return value === null
            || value === undefined
            || Array.isArray(value) && value.length === 0
            || value === this.emptySingleValue();
    }

    getValue(): TOptionValue {
        return this.id;
    }

    setValue(value: TOptionValue): void {
        this.id = value;
        this.title = "";
    }
}
