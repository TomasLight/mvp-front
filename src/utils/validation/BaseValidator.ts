export class BaseValidator {
    protected static isNullOrUndefined(value: any) {
        return value === null || value === undefined;
    }

    protected static isEmptyString(value: string) {
        return typeof (value) === "string" && value.length === 0;
    }

    protected static isEmptyArray(value: number[]) {
        return Array.isArray(value) && value.length === 0;
    }

    protected static isNullOrEmptyString(value: string) {
        return BaseValidator.isNullOrUndefined(value)
            || BaseValidator.isEmptyString(value);
    }

    protected static isNullOrEmptyArray(value: number[]) {
        return BaseValidator.isNullOrUndefined(value)
            || BaseValidator.isEmptyArray(value);
    }

    protected static isPositiveOrZeroNumber(value: number) {
        return typeof value === "number" && value >= 0;
    }
}
