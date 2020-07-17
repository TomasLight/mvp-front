import { Enum } from "@enums";

export const Variant = Object.freeze({
    MainNew: 0,
    MainEdit: 1,
    Workspace: 2,
});

export type Variant = Enum<typeof Variant>;
