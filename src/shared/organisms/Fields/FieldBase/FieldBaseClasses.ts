import { EndAdornmentClassKey } from "@shared/atoms";
import { FieldErrorClassKey, FieldLabelClassKey, FieldLoadingIndicatorClassKey } from "@shared/molecules";
import { Classes } from "@utils";

export type RootClassKey = "root" | "control";

export type FieldBaseClasses<ClassKey extends string = string> = {
    root?: Classes<RootClassKey>,
    label?: Classes<FieldLabelClassKey>,
    endAdornment?: Classes<EndAdornmentClassKey>,
    error?: Classes<FieldErrorClassKey>,
    indicator?: Classes<FieldLoadingIndicatorClassKey>,
    input?: Classes<ClassKey>;
};
