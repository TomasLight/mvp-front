import {
    IFieldErrorProps,
    IFieldLabelProps,
    IFieldLoadingIndicatorProps,
} from "@shared/molecules";

export interface IFieldBaseComponentProps {
    ErrorProps?: Partial<IFieldErrorProps>;
    LabelProps?: Partial<IFieldLabelProps>;
    LoadingIndicatorProps?: Partial<IFieldLoadingIndicatorProps>;
}
