import { CSSProperties } from "react";

import { FieldBaseProps } from "@shared/organisms/Fields/FieldBase";
import { ISelectWrapperProps } from "@select";
import { IFieldOption } from "@select/types";

export interface ISingleSelectProps extends ISelectWrapperProps<IFieldOption>, FieldBaseProps {
    controlStyles?: CSSProperties;
}
