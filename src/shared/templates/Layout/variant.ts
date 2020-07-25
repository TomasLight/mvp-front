import { Enum } from "@enums";

export const Variant = Object.freeze({
    AdminNew: 0,
    AdminEdit: 1,
    Workspace: 2,
});

export type Variant = Enum<typeof Variant>;
