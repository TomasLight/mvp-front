import { Enum } from "@enums";

export const FieldOptionVariant = Object.freeze({
    NA: 0,
    SelectFieldOption: 1,
});

export type FieldOptionVariant = Enum<typeof FieldOptionVariant>;
