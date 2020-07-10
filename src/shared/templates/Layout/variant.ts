import { Enum } from "@enums";

export const Variant = Object.freeze({
    Main: 0,
    Pos: 1,
});

export type Variant = Enum<typeof Variant>;
