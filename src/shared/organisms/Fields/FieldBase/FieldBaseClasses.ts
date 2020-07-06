import { FormControlClassKey } from "@material-ui/core";

import { EndAdornmentClassKey } from "@shared/atoms";
import { FieldErrorClassKey, FieldLabelClassKey, FieldLoadingIndicatorClassKey } from "@shared/molecules";
import { Classes } from "@utils";

export type RootClassKey = "root" | "control";

export type FieldBaseClasses = {
    // root?: Classes<FormControlClassKey>,
    root?: Classes<RootClassKey>,
    label?: Classes<FieldLabelClassKey>,
    endAdornment?: Classes<EndAdornmentClassKey>,
    error?: Classes<FieldErrorClassKey>,
    indicator?: Classes<FieldLoadingIndicatorClassKey>,
};
